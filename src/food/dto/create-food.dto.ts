// src/food/dto/create-food.dto.ts

import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  banner?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  ingredients?: string;

  @IsNumber()
  @IsNotEmpty()
  menuCategoryId: number; // `MenuCategory` bilan bog'lanish uchun ID

  @IsNumber()
  @IsNotEmpty()
  foodEstablishmentId: number; // `FoodEstablishment` bilan bog'lanish uchun ID
}
