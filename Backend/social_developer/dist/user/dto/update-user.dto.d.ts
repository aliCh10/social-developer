import { Post } from 'src/posts/entities/post.entity';
export declare class UpdateUserDto {
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    posts?: Post[];
}
