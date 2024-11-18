import { Injectable } from '@nestjs/common';
import { CreateEventParticipantDto } from '../dto/create-event-participant.dto';

@Injectable()
export class EventsParticipantsService {
  create(createEventParticipantDto: CreateEventParticipantDto) {
    return 'This action adds a new event';
  }
}
