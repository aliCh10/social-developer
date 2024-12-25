import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // Automatically sets the timestamp on creation
  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.sentMessages, { eager: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { eager: true })
  receiver: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages,{ onDelete: 'CASCADE' })
  conversation: Conversation;
  
  

}
