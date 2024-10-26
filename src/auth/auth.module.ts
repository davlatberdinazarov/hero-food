import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // UsersModule ni import qilamiz

@Module({
  imports: [
    UsersModule, // Import qilingan
    PassportModule,
    JwtModule.register({
      secret: "mysecretkey",
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // JwtModule eksport qilinadi
})
export class AuthModule {}
