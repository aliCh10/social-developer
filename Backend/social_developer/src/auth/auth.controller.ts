import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)

  @ApiOperation({ summary: 'Login a user and return a JWT token' })  
  @ApiResponse({ status: 200, description: 'User successfully logged in' })  
  @ApiResponse({ status: 401, description: 'Unauthorized' })  
  @ApiResponse({ status: 400, description: 'Bad Request' })  
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { statusCode: HttpStatus.UNAUTHORIZED,message: 'Invalid credentials' };
    }
    const token = await this.authService.login(user);
    return {
      statusCode: HttpStatus.OK,  
      message: 'User successfully logged in',
      token,  
    };
  }

  
}
