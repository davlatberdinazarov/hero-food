import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { FoodEstablishment } from '../../food-establishment/entities/food-establishment.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', width: 1 })
  rating: number; // Baholash (1 dan 5 gacha bo‘lishi kerak)

  @Column({ nullable: true })
  review: string; // Foydalanuvchi izohi

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.ratings, { nullable: false })
  user: User;

  @ManyToOne(() => FoodEstablishment, (foodEstablishment) => foodEstablishment.ratings, { nullable: false })
  foodEstablishment: FoodEstablishment;
}
