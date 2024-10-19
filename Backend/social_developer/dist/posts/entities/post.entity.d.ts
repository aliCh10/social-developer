import { User } from 'src/user/entities/user.entity';
export declare class Post {
    id: number;
    description: string;
    imageUrl: string;
    user: User;
}
