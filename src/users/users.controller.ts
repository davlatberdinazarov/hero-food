import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { RequestWithUser } from './interfaces/request-with-user.interfece';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Foydalanuvchini yaratish
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Foydalanuvchini yaratishda avtomatik ravishda roli `STUDENT` bo'ladi
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  @Patch('update-phone-password')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updatePhoneAndPassword(
    @Req() req: RequestWithUser,
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    const currentUser = req.user;
    return this.usersService.updatePhoneAndPassword(
      currentUser.id,
      phone,
      password,
    );
  }

  // ID bo'yicha foydalanuvchini olish
  @Get('single/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async delete(@Param('id') id: number, @Req() req: RequestWithUser) {
    const currentUser = req.user;
    return this.usersService.delete(id, currentUser.role);
  }

}
