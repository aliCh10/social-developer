import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';
import { Readable } from 'stream';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    imageFile: Express.Multer.File,
  ): Promise<Post> {
    const user = await this.userService.findOneById(createPostDto.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPostDto.userId} not found`,
      );
    }

    let imagePath = '';

    if (imageFile) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(imageFile.mimetype)) {
        throw new BadRequestException(
          'Invalid file type. Only .jpg, .jpeg, and .png are allowed.',
        );
      }

      try {
        if (imageFile.path) {
          const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'posts',
            public_id: `${Date.now()}`,
            overwrite: true,
          });

          imagePath = uploadResult.secure_url;
          await unlink(imageFile.path);
        } else if (imageFile.buffer) {
          const stream = Readable.from(imageFile.buffer);
          const uploadResult = await new Promise((resolve, reject) => {
            const streamUpload = cloudinary.uploader.upload_stream(
              { folder: 'posts', public_id: `${Date.now()}`, overwrite: true },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              },
            );
            stream.pipe(streamUpload);
          });

          imagePath = (uploadResult as any).secure_url;
        }
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new BadRequestException('Failed to upload image to Cloudinary');
      }
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      user,
      image: imagePath,
    });

    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user', 'comments'] });
    
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async findByUserId(userId: number): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'comments'],
    });
  
    if (posts.length === 0) {
      throw new NotFoundException(`No posts found for user with ID ${userId}`);
    }
  
    return posts;
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);

    if (post.image) {
      const publicId = post.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`posts/${publicId}`);
    }

    await this.postsRepository.remove(post);
  }
}
