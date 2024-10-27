// src/city/city.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Region } from 'src/region/region.entity';
import { CitySize } from '../city-size.enum';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CitySize,
  })
  size: CitySize;

  @ManyToOne(() => Region, (region) => region.cities)
  region: Region;

  @OneToMany(() => FoodEstablishment, (foodEstablishment) => foodEstablishment.city)
  foodEstablishments: FoodEstablishment[];
}
