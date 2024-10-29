// src/food/entities/food.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MenuCategory } from '../../menu-category/entities/menu-category.entity';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true }) // banner rasm URL manzili
  banner: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  ingredients: string;

  @ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.foods)
  menuCategory: MenuCategory;

  @ManyToOne(() => FoodEstablishment, (foodEstablishment) => foodEstablishment.foods)
  foodEstablishment: FoodEstablishment;
}
