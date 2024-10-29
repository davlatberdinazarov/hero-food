import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryController } from './menu-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory, FoodEstablishment])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
  exports: [MenuCategoryService],  // Boshqa modullarda foydalanish uchun eksport qilamiz
})
export class MenuCategoryModule {}
