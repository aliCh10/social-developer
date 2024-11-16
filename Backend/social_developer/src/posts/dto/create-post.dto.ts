import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsInt()
  @Type(() => Number) // Transforme les données reçues en nombre
  userId: number;

  @IsOptional()
  @IsString()
  content?: string;
}
