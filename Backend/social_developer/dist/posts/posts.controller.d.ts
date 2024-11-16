import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, imageFile: Express.Multer.File): Promise<import("./entities/post.entity").Post>;
    getAllPosts(): Promise<import("./entities/post.entity").Post[]>;
    getPostById(id: number): Promise<import("./entities/post.entity").Post>;
    getPostsByUserId(userId: number): Promise<import("./entities/post.entity").Post[]>;
    deletePost(id: number): Promise<void>;
}
