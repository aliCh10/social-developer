import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return {
      message: 'Authentication successful',
      user: req.user,
    };
  }
   
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req) {
    return {
      message: 'Authentication with Facebook successful',
      user: req.user,
    };
  }

  
}
