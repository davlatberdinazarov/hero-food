import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

export enum UserRole {
  SUPERADMIN = 'superAdmin',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Default role - student
  })
  role: UserRole;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}