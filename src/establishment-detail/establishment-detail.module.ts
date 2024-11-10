import { Module } from '@nestjs/common';
import { EstablishmentDetailService } from './establishment-detail.service';
import { EstablishmentDetailController } from './establishment-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentDetail } from './entities/establishment-detail.entity';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentDetail, FoodEstablishment])],
  exports: [EstablishmentDetailService],  // Boshqa modullarda foydalanish uchun eksport qilamiz
  controllers: [EstablishmentDetailController],
  providers: [EstablishmentDetailService],
})
export class EstablishmentDetailModule {}
