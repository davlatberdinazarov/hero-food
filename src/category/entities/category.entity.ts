// src/category/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { LuxuryRate } from '../dto/create-category.dto';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Entity()
@Unique(['name']) // name ustuniga unique constraint o'rnatish
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: LuxuryRate,
  })
  luxuryRate: LuxuryRate;

  @OneToMany(() => FoodEstablishment, (foodEstablishment) => foodEstablishment.category)
  foodEstablishments: FoodEstablishment[];
}
