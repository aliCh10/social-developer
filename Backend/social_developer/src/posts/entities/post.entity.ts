import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string; // Optional description

  @Column({ nullable: true })
  imageUrl: string; // Optional image URL

  @ManyToOne(() => User, (user) => user.posts)
  user: User; // Each post is associated with one user
}
