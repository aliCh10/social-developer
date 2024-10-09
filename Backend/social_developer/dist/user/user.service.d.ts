import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    createGoogleUser(userDto: Partial<User>): Promise<User>;
    createFacebookUser(userDto: Partial<User>): Promise<User>;
    findOneByEmailOrUsername(email: string, username: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneByGoogleId(googleId: string): Promise<User | null>;
    findOneByFacebookId(facebookId: string): Promise<User | null>;
    save(user: User): Promise<User>;
}
