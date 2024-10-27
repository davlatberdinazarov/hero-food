import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RegionName } from './region-name.enum';
import { City } from 'src/city/entities/city.entity';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RegionName,
    unique: true, // Har bir viloyat yagona bo'lishi kerak
    default: RegionName.TASHKENT, // Default qiymat - Toshkent
  })
  name: RegionName;

  @OneToMany(() => City, (city) => city.region, { cascade: true })
  cities: City[];
}
