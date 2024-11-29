import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateEventParticipantDto } from '../dto/create-event-participant.dto';
import { EventParticipant } from '../entities/event-participant.entity';
import { EventsService } from './events.service';

@Injectable()
export class EventsParticipantsService {
  constructor(
    @InjectRepository(EventParticipant)
    private readonly eventParticipantRepository: Repository<EventParticipant>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(EventsService)
    private readonly eventsService: EventsService,
  ) { }

  async create(createEventParticipantDto: CreateEventParticipantDto) {
    const { eventId, userId } = createEventParticipantDto;

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const event = await this.eventsService.findOne(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    const eventParticipant = this.eventParticipantRepository.create({
      event,
      user,
    });

    return await this.eventParticipantRepository.save(eventParticipant);
  }

  async findParticipants(eventId: string) {
    const response = await this.eventParticipantRepository.find({
      where: { event: { id: eventId } },
      relations: ['user'],
    });

    return response.map((participant) => participant.user);
  }

  async remove(eventId: string, userId: string) {
    const eventParticipant = await this.eventParticipantRepository.findOne({
      where: {
        event: { id: eventId },
        user: { id: userId },
      },
    });

    if (!eventParticipant) {
      throw new Error('Event participant not found');
    }

    return await this.eventParticipantRepository.remove(eventParticipant);
  }
}
