import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { MessagesGateway } from './message.gateway';
import { UserService } from 'src/user/user.service';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User,Conversation])], // Ajoutez Message et User ici
  providers: [MessageService,MessagesGateway,UserService],
  controllers: [MessageController],
  exports: [MessageService], // Assurez-vous que MessageService est exporté

})
export class MessageModule {}
