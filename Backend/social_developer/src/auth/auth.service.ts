import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
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

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const newUser = await this.userService.create(createUserDto);
    
    return this.login(newUser);
  }

  


 

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneUserParEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return { id: user.id, email: user.email }; 
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
