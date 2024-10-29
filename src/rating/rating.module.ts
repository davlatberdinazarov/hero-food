import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt'; // JwtModule import qiling

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating, FoodEstablishment, User]),
    JwtModule.register({
      // Sizning JWT sozlamalaringiz, masalan:
      secret: process.env.JWT_SECRET || 'defaultSecret', // Ushbu qatorni o'zgartiring
      signOptions: { expiresIn: '60s' }, // Qachonki token muddati tugasa
    }),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
