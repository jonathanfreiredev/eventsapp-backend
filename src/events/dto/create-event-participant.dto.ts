import { IsUUID } from 'class-validator';

export class CreateEventParticipantDto {
  @IsUUID()
  eventId: string;

  @IsUUID()
  userId: string;
}
