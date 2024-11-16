import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Conversation {
    id: number;
    user1: User;
    user2: User;
    messages: Message[];
    createdAt: Date;
}
