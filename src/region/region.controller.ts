import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionName } from './region-name.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('get')
  async findAll() {
    return this.regionService.findAll();
  }

  @Post('set')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async create(@Body() createRegionDto: { name: RegionName }) {
    return this.regionService.create(createRegionDto);
  }

  // Boshlang'ich viloyatlarni kiritish uchun
  @Post('seed')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async seedRegions() {
    return this.regionService.seedRegions();
  }
}
