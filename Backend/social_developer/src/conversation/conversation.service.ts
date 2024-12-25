import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import { Message } from 'src/message/entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createConversation(createConversationDto: CreateConversationDto): Promise<Conversation> {
    const { userId1, userId2 } = createConversationDto;

    // Check if the users exist
    const user1 = await this.userRepository.findOne({ where: { id: userId1 } });
    const user2 = await this.userRepository.findOne({ where: { id: userId2 } });

    if (!user1 || !user2) {
      throw new Error('One or both users not found');
    }

    // Create and save the new conversation
    const conversation = this.conversationRepository.create({
      user1,
      user2,
    });
    return this.conversationRepository.save(conversation);
  }

  // Envoyer un message dans une conversation
  async sendMessage(conversationId: number, senderId: number, content: string): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['user1', 'user2'],
    });
    if (!conversation) {
      throw new NotFoundException(`Conversation avec l'ID ${conversationId} introuvable.`);
    }

    const message = this.messageRepository.create({
      sender: { id: senderId },
      content,
      timestamp: new Date(),
      conversation,
    });
    return await this.messageRepository.save(message);
  }

  // Vérifier si un utilisateur est en ligne
  async isUserOnline(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} introuvable.`);
    }
    return user.isOnline;
  }
  async getConversationsByUser(userId: number): Promise<Conversation[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Find all conversations where user is either user1 or user2
    const conversations = await this.conversationRepository.find({
      where: [
        { user1: user },
        { user2: user }
      ],
      relations: ['user1', 'user2'],  // Include related users in the response
    });

    return conversations;
  }

  // Get all messages of a conversation
  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['messages'],  // Include related messages
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return conversation.messages;  // Return the list of messages in the conversation
  }

  async deleteConversation(conversationId: number): Promise<void> {
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
    if (!conversation) {
      throw new NotFoundException(`Conversation avec l'ID ${conversationId} introuvable.`);
    }
    await this.conversationRepository.remove(conversation);
  }
}
