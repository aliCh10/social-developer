import { Controller, Post, Body, Param, ParseIntPipe, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('messages') // Define the Swagger tag for this controller

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // Envoyer un message
  // @Post(':conversationId/send')
  // async sendMessage(
  //   @Param('conversationId', ParseIntPipe) conversationId: number,
  //   @Body() body: any, // Inspecter tout le corps pour le débogage
  // ) {
  //   console.log('conversationId:', conversationId);
  //   console.log('body:', body);
  
  //   const { senderId, receiverId, content } = body;
  //   return await this.messageService.sendMessage(senderId, receiverId, content, conversationId);
  // }
  
    // Endpoint to get all messages for a user
    @Get('user/:userId')
    async getUserMessages(@Param('userId') userId: number) {
      return this.messageService.getUserMessages(userId);
    }
}
