import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  // Create a post with an optional description or image
  async create(createPostDto: CreatePostDto, file?: Express.Multer.File): Promise<Post> {
    const { description } = createPostDto;

    // Validation: Either description or image is required
    if (!description && !file) {
      throw new BadRequestException('Either description or image is required');
    }

    const post = new Post();
    if (description) {
      post.description = description;
    }

    if (file) {
      post.imageUrl = file.filename; // Save the image filename
    }

    return await this.postRepository.save(post);
  }

  // Fetch all posts
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  // Fetch a post by ID
  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  // Update a post with optional new description or image
  async update(id: number, updatePostDto: CreatePostDto, file?: Express.Multer.File): Promise<Post> {
    const post = await this.findOne(id);
    const { description } = updatePostDto;

    if (!description && !file && !post.description && !post.imageUrl) {
      throw new BadRequestException('Post must contain either a description or an image');
    }

    if (description) {
      post.description = description;
    }

    if (file) {
      post.imageUrl = file.filename;
    }

    return await this.postRepository.save(post);
  }

  // Delete a post by ID
  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
