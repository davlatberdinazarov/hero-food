
import { IsString, IsNumber } from 'class-validator';

export class CreateMenuCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description?: string; // Optional

  @IsNumber()
  foodEstablishmentId: number; // ID of the related Food Establishment
}
