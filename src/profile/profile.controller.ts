import { Controller, Get, Patch, Body, UseInterceptors, UploadedFile, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RequestWithUser } from 'src/users/interfaces/request-with-user.interfece';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user?.id;
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.profileService.getProfile(userId);
    return {
      id: user.id,
      phone: user.phone,
      image: user.image,
      role: user.role,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };
  }

  @Patch()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async updateProfile(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
    @Body('fullName') fullName: string,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const imagePath = file ? file.filename : null;
    const user = await this.profileService.updateProfile(userId, fullName, imagePath);
    return user;
  }
}