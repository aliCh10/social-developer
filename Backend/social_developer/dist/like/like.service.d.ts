import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class LikeService {
    private readonly likeRepository;
    private readonly postRepository;
    private readonly userRepository;
    constructor(likeRepository: Repository<Like>, postRepository: Repository<Post>, userRepository: Repository<User>);
    addLike(postId: number, userId: number): Promise<Like>;
    removeLike(postId: number, userId: number): Promise<void>;
    getLikesCount(postId: number): Promise<number>;
    getalllikes(): Promise<Like[]>;
}
