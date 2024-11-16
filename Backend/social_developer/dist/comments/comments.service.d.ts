import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentService {
    private commentRepository;
    private postRepository;
    private userRepository;
    constructor(commentRepository: Repository<Comment>, postRepository: Repository<Post>, userRepository: Repository<User>);
    create(createCommentDto: CreateCommentDto, postId: number, userId: number): Promise<Comment>;
    findAll(postId: number): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    remove(id: number): Promise<void>;
}
