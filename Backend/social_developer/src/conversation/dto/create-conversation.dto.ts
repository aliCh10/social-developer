import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsInt()
  @IsNotEmpty()
  userId1: number;

  @IsInt()
  @IsNotEmpty()
  userId2: number;
}
