import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
export declare class PostsService {
    private readonly postRepository;
    private readonly userRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>);
    create(createPostDto: CreatePostDto, file?: Express.Multer.File): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: CreatePostDto, file?: Express.Multer.File): Promise<Post>;
    remove(id: number): Promise<void>;
    getPostsByUserId(userId: number): Promise<Post[]>;
}
