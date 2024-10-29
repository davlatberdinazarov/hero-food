// src/menu-category/dto/update-menu-category.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class UpdateMenuCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
