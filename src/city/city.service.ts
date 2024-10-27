import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CitySize } from './city-size.enum';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async createCity(name: string, size: CitySize, regionId: number): Promise<City> {
    const city = this.cityRepository.create({ name, size, region: { id: regionId } });
    return await this.cityRepository.save(city);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find({ relations: ['region'] });
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id }, relations: ['region'] });
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async findByRegionId(regionId: number): Promise<City[]> {
    return await this.cityRepository.find({
      where: { region: { id: regionId } },
      relations: ['region'],
    });
  }

  async updateCity(id: number, name: string, size: CitySize): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) throw new NotFoundException('City not found');

    city.name = name;
    city.size = size;
    return await this.cityRepository.save(city);
  }
  
  async deleteCity(id: number): Promise<void> {
    const result = await this.cityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('City not found');
    }
  }
}
