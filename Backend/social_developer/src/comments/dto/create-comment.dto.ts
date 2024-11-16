import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Le contenu du commentaire',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
