import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from 'src/user/dto/LoginUserDto';
import { Response } from 'express'; // Import Response for handling redirection

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
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Invalid credentials' };
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
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // Successful authentication with Google
    const user = req.user; // This will contain user data after successful Google authentication

    const token = await this.authService.login(user);
    
    return res.redirect(`http://localhost:3001/Home?token=${token}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user; // This will contain user data after successful Facebook authentication

    // Generate the JWT token
    const token = await this.authService.login(user);
    console.log('token',token);
    
    return res.redirect(`http://localhost:3001/Home?token=${token}`);
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out a user and invalidate the session' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  async logout(@Req() req, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    res.clearCookie('jwt');  

    return res.redirect('http://localhost:3001/login');  
  }

}
