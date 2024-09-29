import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if passwords match
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if email or username already exists
    const existingUser = await this.findOneByEmailOrUsername(createUserDto.email, createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Email or Username already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user without confirmPassword
    const { confirmPassword, ...userData } = createUserDto;
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  // Find a user by email or username
  async findOneByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
  }
}
