import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    followUser(userId: number, targetUserId: number): Promise<{
        message: string;
    }>;
    unfollowUser(userId: number, targetUserId: number): Promise<{
        message: string;
    }>;
    getFollowers(userId: number): Promise<{
        followers: User[];
    }>;
    getFollowing(userId: number): Promise<{
        following: User[];
    }>;
}
