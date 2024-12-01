import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from 'src/events/services/events.service';
import { Repository } from 'typeorm';
import { UserFavouriteEvent } from '../entities/user-favourite-event.entity';
import { UsersService } from './users.service';

@Injectable()
export class UsersFavouriteEventsService {
  constructor(
    @InjectRepository(UserFavouriteEvent)
    private readonly userFavouriteEventsRepository: Repository<UserFavouriteEvent>,
    private readonly usersService: UsersService,
    @Inject(EventsService)
    private readonly eventsService: EventsService,
  ) { }

  async create(userId: string, eventId: string) {
    const user = await this.usersService.findOne(userId);
    const event = await this.eventsService.findOne(eventId);

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    const userFavouriteEvent = this.userFavouriteEventsRepository.create({
      user,
      event,
    });

    return await this.userFavouriteEventsRepository.save(userFavouriteEvent);
  }

  async remove(userId: string, eventId: string) {
    const user = await this.usersService.findOne(userId);
    const event = await this.eventsService.findOne(eventId);

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    return await this.userFavouriteEventsRepository.delete({
      userId,
      eventId,
    });
  }

  async findFavouriteEvents(userId: string) {
    const response = await this.userFavouriteEventsRepository.find({
      where: {
        userId: userId,
      },
      relations: ['event', 'event.participants', 'event.address'],
    });

    return response.map((favouriteEvent) => favouriteEvent.event);
  }

  async isFavouriteEvent(userId: string, eventId: string) {
    const response = await this.userFavouriteEventsRepository.findOne({
      where: {
        userId,
        eventId,
      },
    });

    return !!response;
  }
}
