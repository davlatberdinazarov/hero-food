// src/promotion/promotion.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(FileInterceptor('banner')) // Specify the field name for the file
  async create(@Body() createPromotionDto: CreatePromotionDto, @UploadedFile() file: Express.Multer.File) {
    return await this.promotionService.create(createPromotionDto, file);
  }

  @Get('all')
  async findAll(
    @Query('foodEstablishmentId') foodEstablishmentId?: number,
  ) {
    return await this.promotionService.findAll(
      foodEstablishmentId ? +foodEstablishmentId : undefined,
    );
  }
  

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.promotionService.findById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(FileInterceptor('banner')) // Fayl yuklash uchun interceptor qo‘shildi
  async update(
    @Param('id') id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return await this.promotionService.update(id, updatePromotionDto, file);
  }
  

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async delete(@Param('id') id: number) {
    return await this.promotionService.delete(id);
  }
}
