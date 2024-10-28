import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, FoodEstablishment])],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],  // Boshqa modullarda foydalanish uchun eksport qilamiz

})
export class PromotionModule {}
