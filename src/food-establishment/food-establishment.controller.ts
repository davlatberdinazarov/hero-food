// src/food-establishment/food-establishment.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodEstablishmentService } from './food-establishment.service';
import { CreateFoodEstablishmentDto } from './dto/create-food-establishment.dto';
import { UpdateFoodEstablishmentDto } from './dto/update-food-establishment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('food-establishments')
export class FoodEstablishmentController {
  constructor(
    private readonly foodEstablishmentService: FoodEstablishmentService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './uploads/banners',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createFoodEstablishmentDto: CreateFoodEstablishmentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const bannerUrl = file ? `/uploads/banners/${file.filename}` : null;
    return await this.foodEstablishmentService.create({
      ...createFoodEstablishmentDto,
      banner: bannerUrl,
    });
  }

  @Get('all')
  async findAll(
    @Query('regionId') regionId?: number,
    @Query('cityId') cityId?: number,
    @Query('categoryId') categoryId?: number,
  ) {
    return await this.foodEstablishmentService.findAll(
      regionId ? +regionId : undefined,
      cityId ? +cityId : undefined,
      categoryId ? +categoryId : undefined,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.foodEstablishmentService.findById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async update(
    @Param('id') id: number,
    @Body() updateFoodEstablishmentDto: UpdateFoodEstablishmentDto,
  ) {
    return await this.foodEstablishmentService.update(
      id,
      updateFoodEstablishmentDto,
    );
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async delete(@Param('id') id: number) {
    return await this.foodEstablishmentService.delete(id);
  }
}
