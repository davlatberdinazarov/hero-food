// src/menu-category/menu-category.controller.ts

import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('menu-categories')
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return await this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Get('all')
  async findAll(@Query('foodEstablishmentId') foodEstablishmentId?: number) {
    return await this.menuCategoryService.findAll(foodEstablishmentId ? +foodEstablishmentId : undefined);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.menuCategoryService.findById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async update(@Param('id') id: number, @Body() updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return await this.menuCategoryService.update(id, updateMenuCategoryDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async delete(@Param('id') id: number) {
    return await this.menuCategoryService.delete(id);
  }
}
