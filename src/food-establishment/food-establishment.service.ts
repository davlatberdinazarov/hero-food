// src/food-establishment/food-establishment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FoodEstablishment } from './entities/food-establishment.entity';
import { City } from '../city/entities/city.entity';
import { Region } from '../region/region.entity';
import { CreateFoodEstablishmentDto } from './dto/create-food-establishment.dto';
import { UpdateFoodEstablishmentDto } from './dto/update-food-establishment.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class FoodEstablishmentService {
  constructor(
    @InjectRepository(FoodEstablishment)
    private readonly foodEstablishmentRepository: Repository<FoodEstablishment>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>, // Category repository qo'shildi

    @InjectRepository(City)
    private readonly cityRepository: Repository<City>, // City repository qo'shildi

    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>, // Region repository qo'shildi
  ) {}

  async create(
    createFoodEstablishmentDto: CreateFoodEstablishmentDto,
  ): Promise<FoodEstablishment> {
    const { categoryId, cityId, regionId, ...rest } = createFoodEstablishmentDto;

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    // cityId va regionId asosida City va Region ni topish
    const city = await this.cityRepository.findOne({ where: { id: cityId } });
    if (!city) throw new NotFoundException('City not found');

    const region = await this.regionRepository.findOne({ where: { id: regionId } });
    if (!region) throw new NotFoundException('Region not found');

    // FoodEstablishment obyektini yaratish va saqlash
    const foodEstablishment = this.foodEstablishmentRepository.create({
      ...rest,
      category,
      city,
      region,
    });
    return await this.foodEstablishmentRepository.save(foodEstablishment);
  }

  async findAll(
    regionId?: number,
    cityId?: number,
    categoryId?: number,
  ): Promise<FoodEstablishment[]> {
    const whereConditions: any = {};
    
    if (regionId) whereConditions.region = { id: regionId };
    if (cityId) whereConditions.city = { id: cityId };
    if (categoryId) whereConditions.category = { id: categoryId };

    return await this.foodEstablishmentRepository.find({
      where: whereConditions,
      relations: ['city', 'region', 'category'],
    });
  }

  async findById(id: number): Promise<FoodEstablishment> {
    const foodEstablishment = await this.foodEstablishmentRepository.findOne({
      where: { id },
      relations: ['city', 'region', 'category'],
    });
    if (!foodEstablishment) {
      throw new NotFoundException(`Food establishment with ID ${id} not found`);
    }
    return foodEstablishment;
  }

  async update(
    id: number,
    updateFoodEstablishmentDto: UpdateFoodEstablishmentDto,
  ): Promise<FoodEstablishment> {
    const { categoryId, cityId, regionId, ...rest } = updateFoodEstablishmentDto;

    const foodEstablishment = await this.findById(id);

    
    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) throw new NotFoundException('Category not found');
      foodEstablishment.category = category;
    }

    if (cityId) {
      const city = await this.cityRepository.findOne({ where: { id: cityId } });
      if (!city) throw new NotFoundException('City not found');
      foodEstablishment.city = city;
    }

    if (regionId) {
      const region = await this.regionRepository.findOne({ where: { id: regionId } });
      if (!region) throw new NotFoundException('Region not found');
      foodEstablishment.region = region;
    }

    Object.assign(foodEstablishment, rest);
    return await this.foodEstablishmentRepository.save(foodEstablishment);
  }

  async delete(id: number): Promise<void> {
    const result = await this.foodEstablishmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Food establishment with ID ${id} not found`);
    }
  }
}
