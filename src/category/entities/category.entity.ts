// src/category/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { LuxuryRate } from '../dto/create-category.dto';

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
}
