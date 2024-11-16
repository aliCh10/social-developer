import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
export declare class PostService {
    private readonly userService;
    private readonly postsRepository;
    constructor(userService: UserService, postsRepository: Repository<Post>);
    create(createPostDto: CreatePostDto, imageFile: Express.Multer.File): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    findByUserId(userId: number): Promise<Post[]>;
    delete(id: number): Promise<void>;
}
