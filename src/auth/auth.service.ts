import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByPhone(phone); // Find user by phone
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; // Exclude the password
      return result;
    }
    return null;
  }

  // Login and generate JWT token
  async login(phone: string, password: string) {
    const user = await this.validateUser(phone, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
