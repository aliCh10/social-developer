import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post>;
    getPostsByUserId(userId: number): Promise<Post[]>;
    update(id: string, updatePostDto: CreatePostDto, file: Express.Multer.File): Promise<Post>;
    remove(id: string): Promise<void>;
}
