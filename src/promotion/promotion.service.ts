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

  async findAll(foodEstablishmentId?: number): Promise<Promotion[]> {
    const whereConditions: any = {};
  
    // Agar foodEstablishmentId mavjud bo'lsa, filter sharti qo'shiladi
    if (foodEstablishmentId) {
      whereConditions.foodEstablishment = { id: foodEstablishmentId };
    }
  
    // Filter sharti bilan promotionlarni topish
    return await this.promotionRepository.find({
      where: whereConditions,
      relations: ['foodEstablishment'],
    });
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

  async update(id: number, updatePromotionDto: UpdatePromotionDto, file?: Express.Multer.File): Promise<Promotion> {
    const promotion = await this.findById(id);
  
    // Eski faylni o‘chirish va yangi faylni saqlash
    if (file) {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      const uploadPath = path.join(__dirname, '..', '..', 'uploads', uniqueFileName);
  
      // Agar eski banner mavjud bo‘lsa, uni o‘chirib tashlaymiz
      if (promotion.banner) {
        const oldFilePath = path.join(__dirname, '..', '..', 'uploads', promotion.banner);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
  
      // Yangi faylni yuklaymiz
      fs.writeFileSync(uploadPath, file.buffer);
      promotion.banner = uniqueFileName;
    }
  
    // DTO dan ma'lumotlarni o‘zgartirish
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
