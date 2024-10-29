// src/menu-category/entities/menu-category.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { FoodEstablishment } from '../../food-establishment/entities/food-establishment.entity';
import { Food } from 'src/food/entities/food.entity';

@Entity()
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Category name

  @Column({ nullable: true })
  description: string; // Optional description

  @ManyToOne(() => FoodEstablishment, foodEstablishment => foodEstablishment.menuCategories)
  foodEstablishment: FoodEstablishment; // Relationship to FoodEstablishment

  @OneToMany(() => Food, (food) => food.menuCategory)
  foods: Food[];
}
