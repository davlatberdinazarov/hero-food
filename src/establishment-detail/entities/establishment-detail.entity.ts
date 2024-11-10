// src/establishment-detail/entities/establishment-detail.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Entity()  // <-- This decorator is required
export class EstablishmentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => FoodEstablishment, (foodEstablishment) => foodEstablishment.establishmentDetails)
  foodEstablishment: FoodEstablishment;
}
