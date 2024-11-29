import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/services/addresses.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { CategoryType, Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(AddressesService)
    private readonly addressesService: AddressesService,
  ) { }

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

  async findOne(id: string) {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['address', 'participants'],
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async findAll(category?: CategoryType) {
    return await this.eventsRepository.find({
      where: {
        category: category || undefined,
      },
      relations: ['address'],
    });
  }

  async findMyEvents(userId: string) {
    return await this.eventsRepository.find({
      where: {
        organiserId: userId,
      },
      relations: ['address'],
    });
  }

  async findParticipatingEvents(userId: string) {
    return await this.eventsRepository.find({
      where: {
        participants: {
          userId: userId,
        },
      },
      relations: ['address'],
    })
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

  getCategoryType = (category: string) => {
    switch (category) {
      case 'music':
        return CategoryType.Music;
      case 'sports':
        return CategoryType.Sports;
      case 'workshop':
        return CategoryType.Workshop;
      case 'art':
        return CategoryType.Art;
      case 'food-and-drink':
        return CategoryType.FoodAndDrink;
      case 'business':
        return CategoryType.Business;
      case 'languages':
        return CategoryType.Languages;
      case 'festival':
        return CategoryType.Festival;
      case 'travel':
        return CategoryType.Travel;
      case 'outdoors':
        return CategoryType.Outdoors;
      case 'social':
        return CategoryType.Social;
      default:
        return null;
    }
  }
}