import { Controller, Post, Body, Req, UseGuards, Query, Get, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  @Post('create')
  async createRating(
    @Req() req,
    @Body('foodEstablishmentId') foodEstablishmentId: number,
    @Body('rating') rating: number,
    @Body('review') review: string,
  ) {
    const userId = req.user.id;
    return this.ratingService.createRating(userId, foodEstablishmentId, rating, review);
  }

  @Get('all')
  async getRatings(@Query('foodEstablishmentId') foodEstablishmentId?: number) {
    return this.ratingService.getRatings(foodEstablishmentId);
  }

  @Get(':id')
  async getRatingById(@Param('id') id: number) {
    return this.ratingService.getRatingById(id);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  async updateRating(
    @Param('id') ratingId: number,
    @Req() req,
    @Body('rating') newRating: number,
    @Body('review') newReview?: string,
  ) {
    const userId = req.user.id;
    return this.ratingService.updateRating(ratingId, userId, newRating, newReview);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SUPERADMIN) // This guard ensures only SUPERADMIN can call this endpoint
  async deleteRating(@Param('id') ratingId: number, @Req() req) {
    const userId = req.user.id; // Get the user's ID from the request
    const userRole = req.user.role; // Assume user's role is in the request
  
    return this.ratingService.deleteRating(ratingId, userId, userRole);
  }  
  
}
