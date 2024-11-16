import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post(':id/follow/:targetId')
  async followUser(
    @Param('id', ParseIntPipe) userId: number,
    @Param('targetId', ParseIntPipe) targetUserId: number,
  ) {
    await this.userService.followUser(userId, targetUserId);
    return { message: 'User followed successfully' };
  }

  @Delete(':id/unfollow/:targetId')
  async unfollowUser(
    @Param('id', ParseIntPipe) userId: number,
    @Param('targetId', ParseIntPipe) targetUserId: number,
  ) {
    await this.userService.unfollowUser(userId, targetUserId);
    return { message: 'User unfollowed successfully' };
  }

  @Get(':id/followers')
  async getFollowers(@Param('id', ParseIntPipe) userId: number) {
    const followers = await this.userService.getFollowers(userId);
    return { followers };
  }

  @Get(':id/following')
  async getFollowing(@Param('id', ParseIntPipe) userId: number) {
    const following = await this.userService.getFollowing(userId);
    return { following };
  }
}