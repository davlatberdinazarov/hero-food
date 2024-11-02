import { IsInt, IsNotEmpty } from 'class-validator';

export class GetMenuCategoriesByEstablishmentDto {
  @IsInt()
  @IsNotEmpty()
  foodEstablishmentId: number;
}
