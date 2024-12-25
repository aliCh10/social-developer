import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity'; // Entité "Like"
import { User } from '../user/entities/user.entity'; // Entité "User"
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post, User])], // Importation des entités
  providers: [LikeService], // Services pour la logique métier
  controllers: [LikeController], // Contrôleur pour gérer les routes
})
export class LikeModule {}
