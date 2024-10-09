// auth/dto/login-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
@ApiProperty({ description: 'email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

 @ApiProperty({ description: 'Password of the user', minLength: 8, maxLength: 20 })
  @IsString()
  @IsNotEmpty()
  password: string;
}
