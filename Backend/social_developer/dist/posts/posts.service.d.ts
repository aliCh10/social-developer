import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    create(createPostDto: CreatePostDto, file?: Express.Multer.File): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: CreatePostDto, file?: Express.Multer.File): Promise<Post>;
    remove(id: number): Promise<void>;
}
