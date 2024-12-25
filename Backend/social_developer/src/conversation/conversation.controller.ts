import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from 'src/message/entities/message.entity';
import { Conversation } from './entities/conversation.entity';

@ApiTags('conversations') // Define the Swagger tag for this controller
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  /**
   * Create a new conversation between two users.
   */
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'The conversation has been created successfully.' })
  @ApiResponse({ status: 404, description: 'One or both users not found.' })
  @ApiBody({ type: CreateConversationDto, description: 'User IDs for creating a conversation' })
  @Post('create')
  createConversation(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.createConversation(createConversationDto);
  }


  /**
   * Send a message in a conversation.
   */
  @ApiOperation({ summary: 'Send a message in a conversation' })
  @ApiResponse({ status: 201, description: 'The message has been sent successfully.', type: Message })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  @ApiParam({ name: 'conversationId', description: 'ID of the conversation' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        senderId: { type: 'number', description: 'ID of the sender' },
        content: { type: 'string', description: 'Message content' },
      },
    },
  })
  @Post(':conversationId/messages')
  sendMessage(
    @Param('conversationId') conversationId: number,
    @Body() body: { senderId: number; content: string },
  ): Promise<Message> {
    return this.conversationService.sendMessage(conversationId, body.senderId, body.content);
  }

  /**
   * Check if a user is online.
   */
  @ApiOperation({ summary: 'Check if a user is online' })
  @ApiResponse({ status: 200, description: 'The online status of the user.', type: Boolean })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get('online/:userId')
  isUserOnline(@Param('userId') userId: number): Promise<boolean> {
    return this.conversationService.isUserOnline(userId);
  }
   // Get all conversations of a user
   @ApiOperation({ summary: 'Get all conversations of a user' })
   @ApiResponse({ status: 200, description: 'List of conversations for the user' })
   @ApiResponse({ status: 404, description: 'User not found' })
   @Get('user/:userId')
   async getConversationsByUser(@Param('userId') userId: number): Promise<Conversation[]> {
     return this.conversationService.getConversationsByUser(userId);
   }
 
   // Get all messages of a conversation
   @ApiOperation({ summary: 'Get all messages of a conversation' })
   @ApiResponse({ status: 200, description: 'List of messages in the conversation' })
   @ApiResponse({ status: 404, description: 'Conversation not found' })
   @ApiParam({ name: 'conversationId', type: Number })
   @Get(':conversationId/messages')
   async getMessagesByConversation(
     @Param('conversationId') conversationId: number,
   ): Promise<Message[]> {
     return this.conversationService.getMessagesByConversation(conversationId);
   }
 

 
   // Delete a conversation
   @ApiOperation({ summary: 'Delete a conversation' })
   @ApiResponse({ status: 204, description: 'The conversation has been deleted successfully.' })
   @ApiResponse({ status: 404, description: 'Conversation not found.' })
   @ApiParam({ name: 'conversationId', type: Number })
   @Delete(':conversationId')
   async deleteConversation(@Param('conversationId') conversationId: number): Promise<void> {
     return this.conversationService.deleteConversation(conversationId);
   }
}
