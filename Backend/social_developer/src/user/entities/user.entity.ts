import { IsOptional, IsString } from 'class-validator';
import { Comment } from 'src/comments/entities/comment.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Like } from 'src/like/entities/like.entity';
import { Message } from 'src/message/entities/message.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  googleId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, unique: true })
  facebookId: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // Define a many-to-many relationship for followers and following
  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'user_followers', // This is the join table name
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followerId', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
  @OneToMany(() => Conversation, (conversation) => conversation.user1)
  initiatedConversations: Conversation[];

  @OneToMany(() => Conversation, (conversation) => conversation.user2)
  receivedConversations: Conversation[];
  @Column({ default: false })
  isOnline: boolean; // Indicateur si l'utilisateur est en ligne

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @OneToMany(() => Like, like => like.post)  // Relation un-à-plusieurs avec les likes
  likes: Like[];
}
