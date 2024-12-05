import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersFavouriteEventsService } from './users-favourite-events.service';
import { UserFavouriteEvent } from '../entities/user-favourite-event.entity';
import { UsersService } from './users.service';
import { EventsService } from '../../events/services/events.service';

describe('UsersFavouriteEventsService', () => {
  let service: UsersFavouriteEventsService;
  let userFavouriteEventsRepository: Repository<UserFavouriteEvent>;
  let usersService: UsersService;
  let eventsService: EventsService;

  const mockUser = {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
  };

  const mockEvent = {
    id: 'event1',
    name: 'Tech Conference',
    description: 'A conference about tech.',
  };

  const mockUserFavouriteEvent = {
    userId: mockUser.id,
    eventId: mockEvent.id,
    user: mockUser,
    event: mockEvent,
  };

  const mockUserFavouriteEventsRepository = {
    create: jest.fn().mockReturnValue(mockUserFavouriteEvent),
    save: jest.fn().mockResolvedValue(mockUserFavouriteEvent),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    find: jest.fn().mockResolvedValue([mockUserFavouriteEvent]),
    findOne: jest.fn().mockResolvedValue(mockUserFavouriteEvent),
  };

  const mockUsersService = {
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  const mockEventsService = {
    findOne: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersFavouriteEventsService,
        { provide: getRepositoryToken(UserFavouriteEvent), useValue: mockUserFavouriteEventsRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: EventsService, useValue: mockEventsService },
      ],
    }).compile();

    service = module.get<UsersFavouriteEventsService>(UsersFavouriteEventsService);
    userFavouriteEventsRepository = module.get<Repository<UserFavouriteEvent>>(getRepositoryToken(UserFavouriteEvent));
    usersService = module.get<UsersService>(UsersService);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user favourite event', async () => {
      const result = await service.create(mockUser.id, mockEvent.id);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(eventsService.findOne).toHaveBeenCalledWith(mockEvent.id);
      expect(userFavouriteEventsRepository.create).toHaveBeenCalledWith({
        user: mockUser,
        event: mockEvent,
      });
      expect(userFavouriteEventsRepository.save).toHaveBeenCalledWith(mockUserFavouriteEvent);
      expect(result).toEqual(mockUserFavouriteEvent);
    });

    it('should throw an error if user or event is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);
      
      await expect(service.create(mockUser.id, mockEvent.id)).rejects.toThrow('User or Event not found');
    });
  });

  describe('remove', () => {
    it('should remove a user favourite event', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockEventsService.findOne.mockResolvedValue(mockEvent);
      
      const result = await service.remove(mockUser.id, mockEvent.id);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(eventsService.findOne).toHaveBeenCalledWith(mockEvent.id);
      expect(userFavouriteEventsRepository.delete).toHaveBeenCalledWith({
        userId: mockUser.id,
        eventId: mockEvent.id,
      });
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw an error if user or event is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.remove(mockUser.id, mockEvent.id)).rejects.toThrow('User or Event not found');
    });
  });

  describe('findFavouriteEvents', () => {
    it('should return a list of favourite events for a user', async () => {
      const result = await service.findFavouriteEvents(mockUser.id);

      expect(userFavouriteEventsRepository.find).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        relations: ['event', 'event.participants', 'event.address'],
      });
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('isFavouriteEvent', () => {
    it('should return true if the event is a favourite', async () => {
      const result = await service.isFavouriteEvent(mockUser.id, mockEvent.id);

      expect(userFavouriteEventsRepository.findOne).toHaveBeenCalledWith({
        where: { userId: mockUser.id, eventId: mockEvent.id },
      });
      expect(result).toBe(true);
    });

    it('should return false if the event is not a favourite', async () => {
      mockUserFavouriteEventsRepository.findOne.mockResolvedValue(null);

      const result = await service.isFavouriteEvent(mockUser.id, mockEvent.id);

      expect(result).toBe(false);
    });
  });
});
