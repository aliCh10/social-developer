import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Like {
    id: number;
    post: Post;
    user: User;
}
