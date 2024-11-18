import { IsUUID } from 'class-validator';

export class CreateUserFavouriteEventDto {
  @IsUUID()
  eventId: string;

  @IsUUID()
  userId: string;
}
