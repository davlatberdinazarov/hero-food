import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';
import { RegionName } from './region-name.enum';

@Injectable()
export class RegionService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async findAll(): Promise<Region[]> {
    return await this.regionRepository.find();
  }

  async create(regionData: { name: RegionName }): Promise<Region> {
    const region = this.regionRepository.create(regionData);
    return await this.regionRepository.save(region);
  }

  // Boshlang'ich viloyatlarni qo'shish uchun
  async seedRegions() {
    const regions = [
      { name: RegionName.TASHKENT },
      { name: RegionName.SAMARKAND },
      { name: RegionName.ANDIJAN },
      { name: RegionName.FERGANA },
      { name: RegionName.NAMANGAN },
      { name: RegionName.BUKHARA },
      { name: RegionName.KHOREZM },
      { name: RegionName.KASHKADARYA },
      { name: RegionName.SURKHANDARYA },
      { name: RegionName.JIZZAKH },
      { name: RegionName.NAVOIY },
      { name: RegionName.SYRDARYA },
    ];

    for (const region of regions) {
      const existingRegion = await this.regionRepository.findOne({
        where: { name: region.name },
      });
      if (!existingRegion) {
        await this.regionRepository.save(region);
      }
    }
  }

  // Loyiha ishga tushganda avtomatik chaqiriladi
  async onApplicationBootstrap() {
    await this.seedRegions();
  }
}
