import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async addLike(postId: number, userId: number): Promise<Like> {
    // Vérifier si le post existe
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Vérifier si l'utilisateur a déjà liké ce post
    const existingLike = await this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existingLike) {
      throw new Error('User has already liked this post');
    }

    // Créer un nouveau like
    const like = this.likeRepository.create({
      post,
      user,
    });

    return this.likeRepository.save(like);
  }

  async removeLike(postId: number, userId: number): Promise<void> {
    // Vérifier si le like existe
    const like = await this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (!like) {
      throw new NotFoundException(`Like not found for this post by user ${userId}`);
    }

    // Supprimer le like
    await this.likeRepository.remove(like);
  }

  async getLikesCount(postId: number): Promise<number> {
    const likes = await this.likeRepository.count({
      where: { post: { id: postId } },
    });
    return likes;
  }
}
