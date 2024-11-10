import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEstablishmentDetailDto {
    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
