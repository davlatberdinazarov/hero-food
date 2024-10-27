// src/food-establishment/food-establishment.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { FoodEstablishmentService } from './food-establishment.service';
import { CreateFoodEstablishmentDto } from './dto/create-food-establishment.dto';
import { UpdateFoodEstablishmentDto } from './dto/update-food-establishment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('food-establishments')
export class FoodEstablishmentController {
  constructor(private readonly foodEstablishmentService: FoodEstablishmentService) {}


  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async create(@Body() createFoodEstablishmentDto: CreateFoodEstablishmentDto) {
    return await this.foodEstablishmentService.create(createFoodEstablishmentDto);
  }

  @Get('all')
  async findAll() {
    return await this.foodEstablishmentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.foodEstablishmentService.findById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async update(@Param('id') id: number, @Body() updateFoodEstablishmentDto: UpdateFoodEstablishmentDto) {
    return await this.foodEstablishmentService.update(id, updateFoodEstablishmentDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async delete(@Param('id') id: number) {
    return await this.foodEstablishmentService.delete(id);
  }
}
