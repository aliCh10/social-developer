import { Post } from 'src/posts/entities/post.entity';
export declare class CreateUserDto {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    posts?: Post[];
}
