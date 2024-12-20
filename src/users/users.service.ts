import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createSuperAdmin();
  }

  async createSuperAdmin() {
    const superAdminExists = await this.userRepository.findOne({
      where: { phone: '+998902406016' },
    });

    if (!superAdminExists) {
      const hashedPassword = await bcrypt.hash('password', 10);
      const superAdmin = this.userRepository.create({
        fullName: 'Super Admin',
        phone: '+998902406016',
        password: hashedPassword,
        role: UserRole.SUPERADMIN,
      });
      await this.userRepository.save(superAdmin);
    }
  }

  // Foydalanuvchi yaratish (ro'yxatdan o'tkazish yoki mentor yaratish)
  async create(createUserDto: CreateUserDto) {
    const { fullName, phone, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Telefon orqali foydalanuvchini tekshirish
    const existingUser = await this.findOneByPhone(phone);
    if (existingUser) {
      throw new BadRequestException('Phone number already exists');
    }
    // Rolni har doim `STUDENT` qilib belgilash
    const newUser = this.userRepository.create({
      fullName,
      phone,
      password: hashedPassword,
      role: UserRole.USER, // Roli avtomatik tarzda `user` qilindi
    });

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { role: UserRole.USER },
    });
  }  

  // Telefon raqam orqali foydalanuvchini topish
  async findOneByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  // Foydalanuvchining telefon raqami va parolini yangilash
  async updatePhoneAndPassword(userId: number, phone: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Parolni hashing qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    user.phone = phone;
    user.password = hashedPassword;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user details');
    }
  }

  async delete(id: number, currentUserRole: UserRole) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
    return { deleted: true };
  }

  // ID bo'yicha foydalanuvchini topish
  async findOne(id: number) {
    // ID orqali foydalanuvchini tekshirish
    const user = await this.userRepository.findOne({ where: { id } });

    // Agar foydalanuvchi topilmasa, xato qaytarish
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

}
