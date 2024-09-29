import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    // Register new user
    const newUser = await this.userService.create(createUserDto);
    
    // Generate JWT token after registration
    return this.login(newUser);
  }

  // Generate JWT token for a user
  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
