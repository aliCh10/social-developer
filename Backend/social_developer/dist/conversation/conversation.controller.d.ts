import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from 'src/message/entities/message.entity';
import { Conversation } from './entities/conversation.entity';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    createConversation(createConversationDto: CreateConversationDto): Promise<Conversation>;
    sendMessage(conversationId: number, body: {
        senderId: number;
        content: string;
    }): Promise<Message>;
    isUserOnline(userId: number): Promise<boolean>;
    getConversationsByUser(userId: number): Promise<Conversation[]>;
    getMessagesByConversation(conversationId: number): Promise<Message[]>;
    deleteConversation(conversationId: number): Promise<void>;
}
