// src/food/food.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { MenuCategory } from '../menu-category/entities/menu-category.entity';
import { FoodEstablishment } from '../food-establishment/entities/food-establishment.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,
    
    @InjectRepository(FoodEstablishment)
    private readonly foodEstablishmentRepository: Repository<FoodEstablishment>,
  ) {}

  async create(createFoodDto: CreateFoodDto, banner: string): Promise<Food> {
    const { menuCategoryId, foodEstablishmentId, ...foodData } = createFoodDto;

    const menuCategory = await this.menuCategoryRepository.findOne({ where: { id: menuCategoryId } });
    if (!menuCategory) throw new NotFoundException('Menu Category not found');

    const foodEstablishment = await this.foodEstablishmentRepository.findOne({ where: { id: foodEstablishmentId } });
    if (!foodEstablishment) throw new NotFoundException('Food Establishment not found');

    const food = this.foodRepository.create({
      ...foodData,
      menuCategory,
      foodEstablishment,
      banner,
    });

    return await this.foodRepository.save(food);
  }

  async findAll(): Promise<Food[]> {
    return await this.foodRepository.find({
      relations: ['menuCategory', 'foodEstablishment'],
    });
  }

  async findOne(id: number): Promise<Food> {
    const food = await this.foodRepository.findOne({
      where: { id },
      relations: ['menuCategory', 'foodEstablishment'],
    });
    if (!food) throw new NotFoundException(`Food with ID ${id} not found`);
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto, banner?: string): Promise<Food> {
    const food = await this.findOne(id);

    Object.assign(food, updateFoodDto);
    if (banner) food.banner = banner;

    return await this.foodRepository.save(food);
  }

  async remove(id: number): Promise<void> {
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
  }
}
