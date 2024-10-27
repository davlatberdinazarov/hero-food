import { IsEnum, IsNotEmpty } from 'class-validator';
import { CitySize } from '../city-size.enum';

export class CreateCityDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(CitySize)
  size: CitySize;
}
