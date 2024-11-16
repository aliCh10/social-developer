import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: true })
  content: string;

  @Column()
  image: string; // URL de l'image

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
  @OneToMany(() => Like, like => like.post)  // Relation un-à-plusieurs avec les likes
  likes: Like[];
}
