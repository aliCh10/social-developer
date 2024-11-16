import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 // Assuming Post entity exists

@Entity('comments') // Optionally specify table name
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' }) // Content of the comment
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true }) // Relation to User
  @JoinColumn({ name: 'userId' }) // Join on userId column
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { eager: true }) // Relation to Post
  @JoinColumn({ name: 'postId' }) // Join on postId column
  post: Post;

  @CreateDateColumn() // Automatically set to the current timestamp when the entity is created
  createdAt: Date;

  @UpdateDateColumn() // Automatically updated every time the entity is updated
  updatedAt: Date;
}
