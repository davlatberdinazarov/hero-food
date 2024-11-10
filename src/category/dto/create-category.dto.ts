// src/category/dto/create-category.dto.ts
import {IsString, IsEnum, IsOptional } from 'class-validator';

// src/category/luxury-rate.enum.ts
export enum LuxuryRate {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(LuxuryRate, { message: 'Luxury rate must be between 1 and 5.' })
  luxuryRate: LuxuryRate;

  @IsOptional()
  @IsString()
  image?: string;  // image maydonini qo'shdik
}
