import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserFavouriteEventDto } from '../dto/create-user-favourite-event.dto';
import { UsersFavouriteEventsService } from '../services/users-favourite-events.service';

@Controller('users-favourite-events')
export class UsersFavouriteEventsController {
  constructor(
    private readonly usersFavouriteEventsService: UsersFavouriteEventsService,
  ) {}

  @Post()
  create(@Body() createUserFavouriteEventDto: CreateUserFavouriteEventDto) {
    return this.usersFavouriteEventsService.create(createUserFavouriteEventDto);
  }
}
