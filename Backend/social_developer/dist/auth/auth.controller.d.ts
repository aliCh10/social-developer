import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/LoginUserDto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
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
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    facebookAuth(req: any): Promise<void>;
    facebookAuthRedirect(req: any, res: Response): Promise<void>;
}
