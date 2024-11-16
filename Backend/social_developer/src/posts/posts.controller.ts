import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
@ApiTags('Posts') // Swagger tag for grouping routes
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Intercepts files uploaded under the "image" field
  @ApiConsumes('multipart/form-data') // Specifies that the route accepts multipart data
  @ApiBody({
    description: 'Create a new post with an image',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'integer', example: 1, description: "User ID creating the post" },
        content: { type: 'string', example: 'This is the post content.', description: 'Text content of the post' },
        image: { type: 'string', format: 'binary', description: "Image file for the post (jpeg/png)" },
      },
    },
  })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.postService.create(createPostDto, imageFile);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all posts' })
  async getAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a post by its ID' })
  async getPostById(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Retrieve posts by user ID' })
  async getPostsByUserId(@Param('userId') userId: number) {
    return this.postService.findByUserId(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by its ID' })
  async deletePost(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
