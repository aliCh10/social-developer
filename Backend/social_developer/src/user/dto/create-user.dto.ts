import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'Username of the user' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Password of the user', minLength: 8, maxLength: 20 })
    @IsString()
    @Length(8, 20)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Password confirmation, must match the password' })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    @ApiProperty({ description: 'Email of the user' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
