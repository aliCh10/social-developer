import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
export declare class MessageService {
    private readonly messageRepository;
    private readonly conversationRepository;
    private readonly userRepository;
    constructor(messageRepository: Repository<Message>, conversationRepository: Repository<Conversation>, userRepository: Repository<User>);
    sendMessage(senderId: number, receiverId: number, content: string, conversationId: number): Promise<Message>;
    getMessages(conversationId: number): Promise<Message[]>;
    createMessage(senderId: number, receiverId: number, content: string): Promise<Message>;
    getUserMessages(userId: number): Promise<Message[]>;
}
