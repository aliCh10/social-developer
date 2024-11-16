import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // CREATE
  async create(createCommentDto: CreateCommentDto, postId: number, userId: number): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!post || !user) {
      throw new Error('Post or User not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
      user,
    });

    return await this.commentRepository.save(comment);
  }

  // READ
  async findAll(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
  }

  // UPDATE
  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new Error('Comment not found');
    }

    Object.assign(comment, updateCommentDto);

    return this.commentRepository.save(comment);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new Error('Comment not found');
    }

    await this.commentRepository.remove(comment);
  }
}
