import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CitySize } from '../city-size.enum';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CitySize)
  size?: CitySize;
}
