import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodEstablishmentDto } from './create-food-establishment.dto';

export class UpdateFoodEstablishmentDto extends PartialType(CreateFoodEstablishmentDto) {}
