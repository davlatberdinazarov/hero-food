// src/promotion/promotion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { FoodEstablishment } from '../food-establishment/entities/food-establishment.entity';
import { v4 as uuidv4 } from 'uuid'; // For unique file naming
import * as fs from 'fs'; // For file operations
import * as path from 'path'; // For path operations

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,

    @InjectRepository(FoodEstablishment)
    private readonly foodEstablishmentRepository: Repository<FoodEstablishment>, // Injecting FoodEstablishment repository
  ) {}

  async create(createPromotionDto: CreatePromotionDto, file?: Express.Multer.File): Promise<Promotion> {
    const { foodEstablishmentId, ...promotionData } = createPromotionDto;

    // Check if the FoodEstablishment with the given ID exists
    const foodEstablishment = await this.foodEstablishmentRepository.findOne({
      where: { id: foodEstablishmentId },
    });
    if (!foodEstablishment) {
      throw new NotFoundException('Food Establishment not found');
    }

    let bannerUrl: string | null = null;
    if (file) {
      // Create a unique filename and save the file
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      const uploadPath = path.join(__dirname, '..', '..', 'uploads', uniqueFileName); // Ensure this directory exists

      // Save the file
      fs.writeFileSync(uploadPath, file.buffer);
      bannerUrl = uniqueFileName; // Store the file name or URL as needed
    }

    // Create and save the promotion with the associated Food Establishment
    const promotion = this.promotionRepository.create({
      ...promotionData,
      foodEstablishment,
      banner: bannerUrl, // Store the banner URL
    });
    return await this.promotionRepository.save(promotion);
  }

  async findAll(
    foodEstablishmentId?: number,
  ): Promise<Promotion[]> {
    const whereConditions: any = {};
    
    if (foodEstablishmentId) whereConditions.foodEstablishment = { id: foodEstablishmentId };
    return await this.promotionRepository.find({ relations: ['foodEstablishment'] });
  }

  async findById(id: number): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { id },
      relations: ['foodEstablishment'],
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return promotion;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const promotion = await this.findById(id);
    Object.assign(promotion, updatePromotionDto);
    return await this.promotionRepository.save(promotion);
  }

  async delete(id: number): Promise<void> {
    const result = await this.promotionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
  }
}
