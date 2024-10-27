// src/food-establishment/entities/food-establishment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Region } from '../../region/region.entity';

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

  @Column()
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

  @ManyToOne(() => City, (city) => city.foodEstablishments)
  city: City;

  @ManyToOne(() => Region, (region) => region.foodEstablishments)
  region: Region;
}
