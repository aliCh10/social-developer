import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express'; // Import MulterModule
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]), // Import des entités Post et User
    MulterModule.register({
      dest: './uploads', // Répertoire temporaire pour enregistrer les fichiers uploadés
    }),
  ],
  providers: [PostService, UserService],
  controllers: [PostController],
})
export class PostsModule {}
