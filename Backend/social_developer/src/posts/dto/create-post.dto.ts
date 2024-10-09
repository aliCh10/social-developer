import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional() // Description is optional
  @IsString() // Ensure it's a string if provided
  description?: string;
}
