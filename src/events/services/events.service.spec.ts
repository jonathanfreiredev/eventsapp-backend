import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/services/addresses.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { CategoryType, Event } from '../entities/event.entity';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let eventsRepository: Repository<Event>;
  let usersService: UsersService;
  let addressesService: AddressesService;

  const mockEventsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    merge: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockAddressesService = {
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockUser = {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
  };

  const mockAddress = {
    id: 'address1',
    street: 'Calle de la princesa',
    city: 'Madrid',
    country: 'Spain',
    zip: '12345',
  };

  const mockEvent = {
    id: 'event1',
    name: 'Sample Event',
    address: mockAddress,
    organiser: mockUser,
    startDate: new Date(),
    endDate: new Date(),
    capacity: 100,
    category: CategoryType.Music,
  };

  const createEventDto: CreateEventDto = {
    name: 'Sample Event',
    address: {
      street: mockAddress.street,
      city: mockAddress.city,
      country: mockAddress.country,
      zip: mockAddress.zip,
    },
    startDate: new Date(),
    endDate: new Date(),
    capacity: 100,
    category: CategoryType.Music,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: getRepositoryToken(Event), useValue: mockEventsRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: AddressesService, useValue: mockAddressesService },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventsRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
    usersService = module.get<UsersService>(UsersService);
    addressesService = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an event', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockAddressesService.create.mockResolvedValue(mockAddress);
      mockEventsRepository.create.mockReturnValue({
        name: createEventDto.name,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        capacity: createEventDto.capacity,
        category: createEventDto.category,
      });
      mockEventsRepository.save.mockResolvedValue(mockEvent);

      const result = await service.create(mockUser.id, createEventDto);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(addressesService.create).toHaveBeenCalledWith(createEventDto.address);
      expect(eventsRepository.create).toHaveBeenCalledWith({
        name: createEventDto.name,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        capacity: createEventDto.capacity,
        category: createEventDto.category,
      });
      expect(eventsRepository.save).toHaveBeenCalledWith({
        ...createEventDto,
        address: mockAddress,
        organiser: mockUser,
      });
      expect(result).toEqual(mockEvent);
    });

    it('should throw an error if user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.create('user2', createEventDto)).rejects.toThrow('User not found');

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('findOne', () => {
    it('should find and return an event', async () => {
      mockEventsRepository.findOne.mockResolvedValue(mockEvent);

      const result = await service.findOne(mockEvent.id);

      expect(eventsRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockEvent.id },
        relations: ['address', 'participants'],
      });
      expect(result).toEqual(mockEvent);
    });

    it('should throw an error if event is not found', async () => {
      mockEventsRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(mockEvent.id)).rejects.toThrow('Event not found');
    });
  });

  describe('findAll', () => {
    it('should find and return all events', async () => {
      mockEventsRepository.find.mockResolvedValue([mockEvent]);

      const result = await service.findAll();

      expect(eventsRepository.find).toHaveBeenCalledWith({
        where: { category: undefined },
        relations: ['address'],
      });
      expect(result).toEqual([mockEvent]);
    });

    it('should find and return all events by category', async () => {
      const category = CategoryType.Music;
      mockEventsRepository.find.mockResolvedValue([mockEvent]);

      const result = await service.findAll(category);

      expect(eventsRepository.find).toHaveBeenCalledWith({
        where: { category },
        relations: ['address'],
      });
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('update', () => {
    it('should update and save an event', async () => {
      const { id, ...updateAddressDto } = mockAddress;
      const updateEventDto = { name: 'Updated Event', address: null };

      mockEventsRepository.findOne.mockResolvedValue(mockEvent);
      mockEventsRepository.merge.mockReturnValue({ ...mockEvent, name: updateEventDto.name });
      mockEventsRepository.save.mockResolvedValue({ ...mockEvent, name: updateEventDto.name });

      const result = await service.update(mockEvent.id, updateEventDto);

      expect(eventsRepository.merge).toHaveBeenCalledWith(mockEvent, { name: updateEventDto.name });
      expect(eventsRepository.save).toHaveBeenCalledWith({ ...mockEvent, name: updateEventDto.name });
      expect(result).toEqual({ ...mockEvent, name: updateEventDto.name });
    });
  });

});
