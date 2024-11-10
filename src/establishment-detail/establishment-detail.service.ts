import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablishmentDetail } from './entities/establishment-detail.entity';
import { CreateEstablishmentDetailDto } from './dto/create-establishment-detail.dto';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Injectable()
export class EstablishmentDetailService {
  constructor(
    @InjectRepository(EstablishmentDetail)
    private establishmentDetailRepository: Repository<EstablishmentDetail>,

    @InjectRepository(FoodEstablishment)
    private foodEstablishmentRepository: Repository<FoodEstablishment>,
  ) {}

  // Create
  async create(
    createEstablishmentDetailDto: CreateEstablishmentDetailDto,
    foodEstablishmentId: number,
  ) {
    const foodEstablishment = await this.foodEstablishmentRepository.findOne({
      where: { id: foodEstablishmentId },
    });
    if (!foodEstablishment) {
      throw new NotFoundException(
        `Food establishment with ID ${foodEstablishmentId} not found`,
      );
    }
    const establishmentDetail = this.establishmentDetailRepository.create({
      ...createEstablishmentDetailDto,
      foodEstablishment,
    });
    return await this.establishmentDetailRepository.save(establishmentDetail);
  }

  // Find all
  async findAll() {
    return await this.establishmentDetailRepository.find({
      relations: ['foodEstablishment'],
    });
  }

  // Find one
  // In establishment-detail.service.ts
  async findOne(id: number) {
    const establishmentDetail =
      await this.establishmentDetailRepository.findOne({ where: { id } });
    if (!establishmentDetail) {
      throw new NotFoundException(
        `Establishment detail with ID ${id} not found`,
      );
    }
    return establishmentDetail;
  }

  async findByFoodEstablishmentId(foodEstablishmentId: number) {
    const establishmentDetails = await this.establishmentDetailRepository.find({
      where: { foodEstablishment: { id: foodEstablishmentId } },
      relations: ['foodEstablishment'],
    });
    if (establishmentDetails.length === 0) {
      throw new NotFoundException(`No establishment details found for food establishment ID ${foodEstablishmentId}`);
    }
    return establishmentDetails;
  }
  

  // Update
  // In establishment-detail.service.ts
  async update(
    id: number,
    updateEstablishmentDetailDto: Partial<CreateEstablishmentDetailDto>,
  ) {
    const establishmentDetail =
      await this.establishmentDetailRepository.findOne({ where: { id } });
    if (!establishmentDetail) {
      throw new NotFoundException(
        `Establishment detail with ID ${id} not found`,
      );
    }
    Object.assign(establishmentDetail, updateEstablishmentDetailDto);
    return await this.establishmentDetailRepository.save(establishmentDetail);
  }

  // Delete
  async remove(id: number) {
    const establishmentDetail = await this.findOne(id);
    return await this.establishmentDetailRepository.remove(establishmentDetail);
  }
}
