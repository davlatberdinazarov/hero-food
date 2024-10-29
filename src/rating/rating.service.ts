import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { FoodEstablishment } from '../food-establishment/entities/food-establishment.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FoodEstablishment)
    private readonly foodEstablishmentRepository: Repository<FoodEstablishment>,
  ) {}

  async createRating(userId: number, foodEstablishmentId: number, ratingValue: number, review: string) {
    if (ratingValue < 1 || ratingValue > 5) {
      throw new BadRequestException('Rating must be between 1 and 5.');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.role !== UserRole.USER) {
      throw new ForbiddenException('Only regular users can rate food establishments.');
    }

    const foodEstablishment = await this.foodEstablishmentRepository.findOne({ where: { id: foodEstablishmentId } });
    if (!foodEstablishment) {
      throw new NotFoundException('Food establishment not found.');
    }

    const rating = this.ratingRepository.create({
      rating: ratingValue,
      review,
      user,
      foodEstablishment,
    });

    return this.ratingRepository.save(rating);
  }

  async getRatings(foodEstablishmentId?: number) {
    if (foodEstablishmentId) {
      return this.ratingRepository.find({
        where: { foodEstablishment: { id: foodEstablishmentId } },
        relations: ['user', 'foodEstablishment'],
      });
    }
    return this.ratingRepository.find({ relations: ['user', 'foodEstablishment'] });
  }

  async getRatingById(id: number) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    return rating;
  }
  
  async updateRating(ratingId: number, userId: number, newRatingValue: number, newReview?: string) {
    if (newRatingValue < 1 || newRatingValue > 5) {
      throw new BadRequestException('Rating must be between 1 and 5.');
    }
  
    const rating = await this.ratingRepository.findOne({
      where: { id: ratingId, user: { id: userId } },
      relations: ['user'],
    });
  
    if (!rating) {
      throw new NotFoundException('Rating not found or you do not have permission to update it.');
    }
  
    rating.rating = newRatingValue;
    if (newReview !== undefined) {
      rating.review = newReview;
    }
  
    return this.ratingRepository.save(rating);
  }

  async deleteRating(ratingId: number, userId: number, userRole: UserRole): Promise<DeleteResult> {
    const rating = await this.ratingRepository.findOne({
      where: { id: ratingId },
      relations: ['user'],
    });
  
    if (!rating) {
      throw new NotFoundException('Rating not found.');
    }
  
    // Allow deletion only if the user is a SUPERADMIN or the owner of the rating
    if (userRole !== UserRole.SUPERADMIN && rating.user.id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this rating.');
    }
  
    return this.ratingRepository.delete(ratingId);
  }   
  
}
