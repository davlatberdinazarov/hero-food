import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablishmentDetailDto } from './create-establishment-detail.dto';

export class UpdateEstablishmentDetailDto extends PartialType(CreateEstablishmentDetailDto) {}
