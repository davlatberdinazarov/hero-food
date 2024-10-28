import { Module } from '@nestjs/common';
import { FoodEstablishmentService } from './food-establishment.service';
import { FoodEstablishmentController } from './food-establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEstablishment } from './entities/food-establishment.entity';
import { City } from 'src/city/entities/city.entity';
import { Region } from 'src/region/region.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEstablishment, City, Region, Category])],
  controllers: [FoodEstablishmentController],
  providers: [
    FoodEstablishmentService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
  exports: [FoodEstablishmentService],
})
export class FoodEstablishmentModule {}
