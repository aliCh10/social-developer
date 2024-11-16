import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Post {
    id: number;
    content: string;
    image: string;
    user: User;
    comments: Comment[];
    likes: Like[];
}
