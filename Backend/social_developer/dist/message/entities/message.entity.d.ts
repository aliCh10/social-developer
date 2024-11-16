import { User } from '../../user/entities/user.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
export declare class Message {
    id: number;
    content: string;
    timestamp: Date;
    sender: User;
    receiver: User;
    conversation: Conversation;
}
