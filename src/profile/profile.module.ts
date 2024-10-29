import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { User } from '../users/entities/user.entity';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService], // Export if needed in other modules
})
export class ProfileModule { }