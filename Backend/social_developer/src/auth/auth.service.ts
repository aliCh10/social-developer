import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user using email/password
  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const newUser = await this.userService.create(createUserDto);
    return this.login(newUser);
  }

  // Create or update a Google user
  async createOrUpdateGoogleUser(userDto: Partial<User>): Promise<User> {
    let user = await this.userService.findOneByGoogleId(userDto.googleId);
    
    if (user) {
      // Update existing Google user
      return this.userService.save({ ...user, ...userDto });
    } else {
      // Register a new Google user
      return this.userService.createGoogleUser(userDto);
    }
  }
 // Create or update a Facebook user
 async createOrUpdateFacebookUser(userDto: Partial<User>): Promise<User> {
  if (!userDto.facebookId) {
    throw new BadRequestException('Facebook ID is required to create or update a user.');
  }

  // Check if the user already exists by Facebook ID
  let user = await this.userService.findOneByFacebookId(userDto.facebookId);
  
  // If user exists, update their profile
  if (user) {
    return this.userService.save({ ...user, ...userDto });
  }

  // Check if the user already exists by email to avoid duplicate entry
  user = await this.userService.findOneByEmail(userDto.email);
  if (user) {
    // Optionally update the user with Facebook info
    return this.userService.save({ ...user, facebookId: userDto.facebookId});
  }

  // If no user exists, create a new one
  return this.userService.createFacebookUser(userDto);
}

  // Validate user for email/password login
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Generate JWT token after login
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
