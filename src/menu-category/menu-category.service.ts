// src/menu-category/menu-category.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { FoodEstablishment } from '../food-establishment/entities/food-establishment.entity';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,

    @InjectRepository(FoodEstablishment)
    private readonly foodEstablishmentRepository: Repository<FoodEstablishment>,
  ) {}

  async create(createMenuCategoryDto: CreateMenuCategoryDto): Promise<MenuCategory> {
    const { foodEstablishmentId, ...categoryData } = createMenuCategoryDto;

    const foodEstablishment = await this.foodEstablishmentRepository.findOne({
      where: { id: foodEstablishmentId },
    });
    if (!foodEstablishment) {
      throw new NotFoundException('Food Establishment not found');
    }

    const menuCategory = this.menuCategoryRepository.create({
      ...categoryData,
      foodEstablishment,
    });

    return await this.menuCategoryRepository.save(menuCategory);
  }

  async findAll(foodEstablishmentId?: number): Promise<MenuCategory[]> {
    const whereConditions: any = {};
    
    if (foodEstablishmentId) {
      whereConditions.foodEstablishment = { id: foodEstablishmentId };
    }

    return await this.menuCategoryRepository.find({ where: whereConditions, relations: ['foodEstablishment'] });
  }

  async findByEstablishment(establishmentId: number): Promise<MenuCategory[]> {
    const establishment = await this.foodEstablishmentRepository.findOne({ where: { id: establishmentId } });
    if (!establishment) throw new NotFoundException('Food Establishment not found');
    
    return this.menuCategoryRepository.find({ where: { foodEstablishment: establishment } });
  }


  async findById(id: number): Promise<MenuCategory> {
    const category = await this.menuCategoryRepository.findOne({
      where: { id },
      relations: ['foodEstablishment'],
    });
    if (!category) {
      throw new NotFoundException(`Menu Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto): Promise<MenuCategory> {
    const category = await this.findById(id);
    Object.assign(category, updateMenuCategoryDto);
    return await this.menuCategoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const result = await this.menuCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu Category with ID ${id} not found`);
    }
  }
}
