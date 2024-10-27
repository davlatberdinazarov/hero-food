import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CitySize } from './city-size.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('create-city')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async createCity(
    @Body('name') name: string,
    @Body('size') size: CitySize,
    @Body('regionId') regionId: number,
  ) {
    return await this.cityService.createCity(name, size, regionId);
  }

  @Get('get-cities')
  async findAll() {
    return await this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.cityService.findOne(id);
  }

  @Get('region/:regionId')
  async findByRegionId(@Param('regionId') regionId: number) {
    return await this.cityService.findByRegionId(regionId);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async updateCity(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('size') size: CitySize,
  ) {
    return await this.cityService.updateCity(id, name, size);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async deleteCity(@Param('id') id: number) {
    return await this.cityService.deleteCity(id);
  }
}
