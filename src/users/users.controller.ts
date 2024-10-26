import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Foydalanuvchini yaratish
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Foydalanuvchini yaratishda avtomatik ravishda roli `STUDENT` bo'ladi
    return this.usersService.create(createUserDto);
  }

  // @Patch('update-phone-password')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async updatePhoneAndPassword(
  //   @Req() req: RequestWithUser,
  //   @Body('phone') phone: string,
  //   @Body('password') password: string,
  // ) {
  //   const currentUser = req.user;
  //   return this.usersService.updatePhoneAndPassword(currentUser.id, phone, password);
  // }
}
