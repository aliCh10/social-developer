import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.likes)  // Relation plusieurs-à-un avec le Post
  post: Post;

  @ManyToOne(() => User, user => user.likes)  // Relation plusieurs-à-un avec l'Utilisateur
  user: User;
}
