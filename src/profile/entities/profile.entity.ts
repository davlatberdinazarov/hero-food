import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;  // Rasm URLi

  @Column({ nullable: true })
  fullName: string;
  
  @Column({ nullable: true })
  phone: string;
}