import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string; // Optional image field

  @IsOptional()
  @IsNotEmpty()
  userId: number;
}
