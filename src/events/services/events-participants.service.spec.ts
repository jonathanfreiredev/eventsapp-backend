import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventsParticipantsService } from './events-participants.service';
import { EventsService } from './events.service';
import { UsersService } from 'src/users/services/users.service';
import { EventParticipant } from '../entities/event-participant.entity';
import { CreateEventParticipantDto } from '../dto/create-event-participant.dto';
import { Repository } from 'typeorm';

describe('EventsParticipantsService', () => {
  let service: EventsParticipantsService;
  let eventParticipantRepository: Repository<EventParticipant>;
  let usersService: UsersService;
  let eventsService: EventsService;

  const mockEventParticipantRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockEventsService = {
    findOne: jest.fn(),
  };

  const mockUser = {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
  };

  const mockEvent = {
    id: 'event1',
    name: 'Sample Event',
  };

  const mockEventParticipant = {
    id: 'eventParticipant1',
    event: mockEvent,
    user: mockUser,
  };

  const createEventParticipantDto: CreateEventParticipantDto = {
    eventId: mockEvent.id,
    userId: mockUser.id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsParticipantsService,
        { provide: getRepositoryToken(EventParticipant), useValue: mockEventParticipantRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: EventsService, useValue: mockEventsService },
      ],
    }).compile();

    service = module.get<EventsParticipantsService>(EventsParticipantsService);
    eventParticipantRepository = module.get<Repository<EventParticipant>>(getRepositoryToken(EventParticipant));
    usersService = module.get<UsersService>(UsersService);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an event participant', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockEventsService.findOne.mockResolvedValue(mockEvent);
      mockEventParticipantRepository.create.mockReturnValue(mockEventParticipant);
      mockEventParticipantRepository.save.mockResolvedValue(mockEventParticipant);

      const result = await service.create(createEventParticipantDto);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(eventsService.findOne).toHaveBeenCalledWith(mockEvent.id);
      expect(eventParticipantRepository.create).toHaveBeenCalledWith({
        event: mockEvent,
        user: mockUser,
      });
      expect(eventParticipantRepository.save).toHaveBeenCalledWith(mockEventParticipant);
      expect(result).toEqual(mockEventParticipant);
    });

    it('should throw an error if user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.create(createEventParticipantDto)).rejects.toThrow('User not found');
    });

    it('should throw an error if event is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockEventsService.findOne.mockResolvedValue(null);

      await expect(service.create(createEventParticipantDto)).rejects.toThrow('Event not found');
    });
  });

  describe('findParticipants', () => {
    it('should return participants for an event', async () => {
      mockEventParticipantRepository.find.mockResolvedValue([mockEventParticipant]);

      const result = await service.findParticipants(mockEvent.id);

      expect(eventParticipantRepository.find).toHaveBeenCalledWith({
        where: { event: { id: mockEvent.id } },
        relations: ['user'],
      });
      expect(result).toEqual([mockUser]);
    });
  });

  describe('remove', () => {
    it('should remove an event participant', async () => {
      mockEventParticipantRepository.findOne.mockResolvedValue(mockEventParticipant);
      mockEventParticipantRepository.remove.mockResolvedValue(mockEventParticipant);

      const result = await service.remove(mockEvent.id, mockUser.id);

      expect(eventParticipantRepository.findOne).toHaveBeenCalledWith({
        where: {
          eventId: mockEvent.id,
          userId: mockUser.id,
        },
      });
      expect(eventParticipantRepository.remove).toHaveBeenCalledWith(mockEventParticipant);
      expect(result).toEqual(mockEventParticipant);
    });

    it('should throw an error if event participant is not found', async () => {
      mockEventParticipantRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(mockEvent.id, mockUser.id)).rejects.toThrow('Event participant not found');
    });
  });
});
