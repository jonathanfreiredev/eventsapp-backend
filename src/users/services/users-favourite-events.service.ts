import { Injectable } from '@nestjs/common';
import { CreateUserFavouriteEventDto } from '../dto/create-user-favourite-event.dto';

@Injectable()
export class UsersFavouriteEventsService {
  create(createUserFavouriteEventDto: CreateUserFavouriteEventDto) {
    return 'This action adds a new user';
  }
}
