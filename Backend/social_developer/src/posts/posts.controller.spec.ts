import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Intercepte les fichiers envoyés sous le champ "image"
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.postService.create(createPostDto, imageFile);
  }
}
