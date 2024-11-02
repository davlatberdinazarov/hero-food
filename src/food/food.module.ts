import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';
import { MenuCategory } from 'src/menu-category/entities/menu-category.entity';
import { Food } from './entities/food.entity';
import { MenuCategoryService } from 'src/menu-category/menu-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, FoodEstablishment, MenuCategory])],
  controllers: [FoodController],
  providers: [FoodService, MenuCategoryService],
})
export class FoodModule {}
