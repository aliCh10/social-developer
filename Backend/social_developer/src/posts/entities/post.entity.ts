import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string; // Optional description

  @Column({ nullable: true })
  imageUrl: string; // Optional image URL
}
