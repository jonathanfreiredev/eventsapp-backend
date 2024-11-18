import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/services/addresses.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(AddressesService)
    private addressesService: AddressesService,
  ) {}

  async create(userId: string, createEventDto: CreateEventDto) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { address, ...eventDto } = createEventDto;

    const event = this.eventsRepository.create(eventDto);

    event.address = await this.addressesService.create(address);

    event.organiser = user;

    return await this.eventsRepository.save(event);
  }

  findOne(id: string) {
    const event = this.eventsRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    if (!event) {
      throw new Error('Event not found');
    }

    const { address, ...eventDto } = updateEventDto;

    const mergedEvent = this.eventsRepository.merge(event, eventDto);

    if (address) {
      const updatedAddress = await this.addressesService.update(
        event.address.id,
        address,
      );

      mergedEvent.address = updatedAddress;
    }

    return await this.eventsRepository.save(mergedEvent);
  }
}
