import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import { Message } from 'src/message/entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
export declare class ConversationService {
    private readonly conversationRepository;
    private readonly userRepository;
    private readonly messageRepository;
    constructor(conversationRepository: Repository<Conversation>, userRepository: Repository<User>, messageRepository: Repository<Message>);
    createConversation(createConversationDto: CreateConversationDto): Promise<Conversation>;
    sendMessage(conversationId: number, senderId: number, content: string): Promise<Message>;
    isUserOnline(userId: number): Promise<boolean>;
    getConversationsByUser(userId: number): Promise<Conversation[]>;
    getMessagesByConversation(conversationId: number): Promise<Message[]>;
    deleteConversation(conversationId: number): Promise<void>;
}
