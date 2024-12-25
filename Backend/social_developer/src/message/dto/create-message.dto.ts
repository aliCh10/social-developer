// src/messages/dto/create-message.dto.ts
import { IsInt, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'ID of the user sending the message' })
  @IsInt()
  senderId: number;

  @ApiProperty({ description: 'ID of the user receiving the message' })
  @IsInt()
  receiverId: number;

  @ApiProperty({ description: 'Content of the message' })
  @IsString()
  @MinLength(1, { message: 'Message content must not be empty' })
  content: string;
}
