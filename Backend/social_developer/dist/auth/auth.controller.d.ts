import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        token?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        token: {
            access_token: string;
        };
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): {
        message: string;
        user: any;
    };
    facebookAuth(req: any): Promise<void>;
    facebookAuthRedirect(req: any): Promise<{
        message: string;
        user: any;
    }>;
}
