// src/promotion/dto/create-promotion.dto.ts
import { IsDate, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  foodEstablishmentId: number;
}
