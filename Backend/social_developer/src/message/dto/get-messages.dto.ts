// src/message/dto/get-messages.dto.ts
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty({
    description: 'The ID of the sender',
    type: Number,
  })
  @IsInt()
  senderId: number;

  @ApiProperty({
    description: 'The ID of the receiver',
    type: Number,
  })
  @IsInt()
  receiverId: number;
}
