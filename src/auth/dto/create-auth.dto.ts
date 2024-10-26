import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    phone: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}
