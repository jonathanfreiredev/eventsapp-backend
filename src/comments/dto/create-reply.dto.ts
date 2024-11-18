import { IsString, IsUUID } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  content: string;

  @IsUUID()
  commentId: string;
}
