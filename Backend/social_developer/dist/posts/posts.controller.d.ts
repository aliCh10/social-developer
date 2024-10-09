import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<import("./entities/post.entity").Post>;
    findAll(): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: CreatePostDto, file: Express.Multer.File): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<void>;
}
