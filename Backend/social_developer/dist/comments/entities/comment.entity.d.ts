import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: number;
    content: string;
    user: User;
    post: Post;
    createdAt: Date;
    updatedAt: Date;
}
