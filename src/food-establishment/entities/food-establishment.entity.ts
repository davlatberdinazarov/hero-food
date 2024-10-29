// src/food-establishment/entities/food-establishment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Region } from '../../region/region.entity';
import { Category } from 'src/category/entities/category.entity';
import { Promotion } from 'src/promotion/entities/promotion.entity';
import { MenuCategory } from 'src/menu-category/entities/menu-category.entity';
import { Food } from 'src/food/entities/food.entity';
import { Rating } from 'src/rating/entities/rating.entity';

export enum SizeOfEstablishment {
  SMALL = 'small',
  MEDIUM = 'medium',
  HUGE = 'huge',
}

@Entity()
export class FoodEstablishment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true }) // Make the banner field nullable
  banner: string; // Banner URL

  @Column()
  ownerFullName: string;

  @Column()
  address: string;

  @Column()
  workingTime: string; // e.g., "8:00 - 19:00"

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: SizeOfEstablishment,
  })
  sizeOfEstablishment: SizeOfEstablishment;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.foodEstablishments)
  category: Category;

  @ManyToOne(() => City, (city) => city.foodEstablishments)
  city: City;

  @ManyToOne(() => Region, (region) => region.foodEstablishments)
  region: Region;

  @OneToMany(() => Promotion, (promotion) => promotion.foodEstablishment)
  promotions: Promotion[]; // `Promotion` bilan bog'lanish

  @OneToMany(() => MenuCategory, (menuCategories) => menuCategories.foodEstablishment)
  menuCategories: MenuCategory[]; // `Promotion` bilan bog'lanish

  @OneToMany(() => Food, (food) => food.foodEstablishment)
  foods: Food[];

  @OneToMany(() => Rating, (rating) => rating.foodEstablishment)
  ratings: Rating[];
}
