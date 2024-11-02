// src/food/food.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { MenuCategoryService } from '../menu-category/menu-category.service';

@Controller('foods')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly menuCategoryService: MenuCategoryService, // Injecting MenuCategoryService
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './uploads/banners', // Where images will be stored
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createFoodDto: CreateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const banner = file ? file.path : null;
    return await this.foodService.create(createFoodDto, banner);
  }

  @Get('all')
  async findAll() {
    return await this.foodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.foodService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './uploads/banners',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const banner = file ? file.path : null;
    return await this.foodService.update(id, updateFoodDto, banner);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.foodService.remove(id);
  }

  @Get('by-category/:categoryId')
  async findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.foodService.findByCategory(categoryId);
  }


  // New method to get categories by establishment ID
  @Get('categories/by-establishment/:id')
  async getCategoriesByEstablishment(@Param('id', ParseIntPipe) id: number) {
    return await this.menuCategoryService.findByEstablishment(id);
  }
}
