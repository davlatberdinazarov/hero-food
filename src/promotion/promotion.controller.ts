// src/promotion/promotion.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    return await this.promotionService.create(createPromotionDto);
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
  async update(@Param('id') id: number, @Body() updatePromotionDto: UpdatePromotionDto) {
    return await this.promotionService.update(id, updatePromotionDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async delete(@Param('id') id: number) {
    return await this.promotionService.delete(id);
  }
}
