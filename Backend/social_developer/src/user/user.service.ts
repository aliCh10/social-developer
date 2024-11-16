import { Injectable, BadRequestException } from '@nestjs/common';
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

  // Create a new user with email/password
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmailOrUsername(createUserDto.email, createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Email or Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { confirmPassword, ...userData } = createUserDto;
    const newUser = this.userRepository.create({ ...userData, password: hashedPassword });
    
    return this.userRepository.save(newUser);
  }

  // Create a new Google user
  async createGoogleUser(userDto: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }

  // Create a new Facebook user
  async createFacebookUser(userDto: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }

  // Find user by ID
  async findOneById(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  // Find user by email or username
  async findOneByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: [{ email }, { username }] });
  }

  // Find user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Find user by Google ID
  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { googleId } });
  }

  // Find user by Facebook ID
  async findOneByFacebookId(facebookId: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { facebookId } });
  }

  // Save or update a user
  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async followUser(userId: number, targetUserId: number): Promise<void> {
    if (userId === targetUserId) {
      throw new Error("You can't follow yourself");
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    const targetUser = await this.userRepository.findOne({ where: { id: targetUserId } });

    if (!targetUser) {
      throw new Error('User not found');
    }

    user.following.push(targetUser);
    await this.userRepository.save(user);
  }

  async unfollowUser(userId: number, targetUserId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });

    user.following = user.following.filter(user => user.id !== targetUserId);
    await this.userRepository.save(user);
  }

  async getFollowers(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['followers'],
    });
    return user ? user.followers : [];
  }

  async getFollowing(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    return user ? user.following : [];
  }
}
