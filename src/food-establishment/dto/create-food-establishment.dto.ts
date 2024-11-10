import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { SizeOfEstablishment } from '../entities/food-establishment.entity';
import { Optional } from '@nestjs/common';

export class CreateFoodEstablishmentDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  banner?: string; // Fayl yo'li saqlanishi uchun optional maydon

  @IsNotEmpty()
  ownerFullName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  workingTime: string;

  @IsNotEmpty()
  phoneNumber: string;

  @Optional()
  instagram: string;

  @Optional()
  telegram: string;

  @IsNotEmpty()
  @IsEnum(SizeOfEstablishment)
  sizeOfEstablishment: SizeOfEstablishment;

  @IsNotEmpty()
  categoryId?: number;  // City ID maydoni

  @IsNotEmpty()
  cityId?: number;  // City ID maydoni

  @IsNotEmpty()
  regionId?: number;  // Region ID maydoni
}
