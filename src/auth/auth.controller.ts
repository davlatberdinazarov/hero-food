import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const { phone, password } = createAuthDto;

    // Call the AuthService to handle login
    try {
      return await this.authService.login(phone, password);
    } catch (error) {
      // Handle errors and provide meaningful response
      throw new UnauthorizedException('Invalid phone or password');
    }
  }
}
