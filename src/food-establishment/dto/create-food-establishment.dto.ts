import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { SizeOfEstablishment } from '../entities/food-establishment.entity';

export class CreateFoodEstablishmentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  banner: string;

  @IsNotEmpty()
  ownerFullName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  workingTime: string;

  @IsNotEmpty()
  phoneNumber: string;

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
