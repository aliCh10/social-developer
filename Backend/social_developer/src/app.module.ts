import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { CommentModule } from './comments/comments.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    dataSourceOptions,
   ),
   ConfigModule.forRoot({
    isGlobal: true, // Rend les variables d'environnement accessibles dans tout le projet
  }),
   UserModule, AuthModule,PassportModule.register({ defaultStrategy: 'jwt' }), PostsModule, MessageModule, ConversationModule, CommentModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
