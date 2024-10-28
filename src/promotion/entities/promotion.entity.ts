// src/promotion/entities/promotion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FoodEstablishment } from 'src/food-establishment/entities/food-establishment.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Aksiya nomi

  @Column('text')
  description: string; // Aksiya tavsifi

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discountPercentage: number; // Aksiya chegirma foizi

  @Column()
  startDate: Date; // Aksiya boshlanish sanasi

  @Column()
  endDate: Date; // Aksiya tugash sanasi

  @ManyToOne(() => FoodEstablishment, (foodEstablishment) => foodEstablishment.promotions)
  foodEstablishment: FoodEstablishment; // Aksiyani `FoodEstablishment` bilan bog'lash

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
