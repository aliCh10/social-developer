import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Le contenu du commentaire à mettre à jour',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  content: string;
}
