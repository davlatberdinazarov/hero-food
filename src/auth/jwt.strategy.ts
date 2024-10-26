import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service'; // Import qilish

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "mysecretkey", // JwtModule'da ishlatilgan secretKey bilan bir xil bo'lishi kerak
    });
  }

  async validate(payload: JwtPayload) {
    // payload.username o'rniga payload.phone ishlatish
    const user = await this.usersService.findOneByPhone(payload.phone); // Telefon orqali foydalanuvchini izlash
    if (!user) {
      throw new UnauthorizedException('User not found'); // Foydalanuvchi topilmasa xato
    }
    return user; // JWT token valid bo'lsa, foydalanuvchi ma'lumotlarini qaytaradi
  }
}
