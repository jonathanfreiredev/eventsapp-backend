import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventParticipantDto } from '../dto/create-event-participant.dto';
import { EventsParticipantsService } from '../services/events-participants.service';

@Controller('events-participants')
export class EventsParticipantsController {
  constructor(
    private readonly eventsParticipantsService: EventsParticipantsService,
  ) {}

  @Post()
  create(@Body() createEventParticipantDto: CreateEventParticipantDto) {
    return this.eventsParticipantsService.create(createEventParticipantDto);
  }
}
