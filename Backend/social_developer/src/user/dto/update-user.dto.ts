import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
