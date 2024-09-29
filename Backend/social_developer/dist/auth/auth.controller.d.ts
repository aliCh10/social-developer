import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
