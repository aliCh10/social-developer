import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Envoyer un message dans une conversation
  async sendMessage(senderId: number, receiverId: number, content: string, conversationId: number): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] });
    
    if (!sender || !receiver) throw new NotFoundException('User not found');
    if (!conversation) throw new NotFoundException('Conversation not found');

    const message = this.messageRepository.create({ sender, receiver, content, conversation });
    return await this.messageRepository.save(message);
  }

  // Récupérer les messages d'une conversation
  async getMessages(conversationId: number): Promise<Message[]> {
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] });
    if (!conversation) throw new NotFoundException('Conversation not found');
    return conversation.messages;
  }
  async createMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) throw new NotFoundException('User(s) not found');

    const message = this.messageRepository.create({
      sender,
      receiver,
      content,
    });

    return this.messageRepository.save(message);
  }
  async getUserMessages(userId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: userId } }, // Messages sent by the user
        { receiver: { id: userId } }, // Messages received by the user
      ],
      relations: ['sender', 'receiver', 'conversation'], // Join with sender, receiver and conversation if needed
    });

    if (messages.length === 0) {
      throw new NotFoundException('No messages found for this user');
    }

    return messages;
  }
  
}
