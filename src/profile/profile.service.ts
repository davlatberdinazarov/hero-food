import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Profilni olish
  async getProfile(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Profile not found');
    }
    return user;
  }

  // Profilni yangilash
  async updateProfile(userId: number, fullName: string, image: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Profile not found');
    }
    
    user.fullName = fullName || user.fullName;
    user.image = image || user.image;
    
    await this.usersRepository.save(user);
    return user;
  }
}