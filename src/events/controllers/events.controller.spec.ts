import { Test, TestingModule } from '@nestjs/testing';
import { Address } from 'src/addresses/entities/address.entity';
import { UserResponse } from 'src/users/interfaces/user-response.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../auth/interfaces/authenticated-request.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { CategoryType } from '../entities/event.entity';
import { EventResponse } from '../interfaces/event-response.interface';
import { EventsParticipantsService } from '../services/events-participants.service';
import { EventsService } from '../services/events.service';
import { EventsController } from './events.controller';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: EventsService;
  let eventsParticipantsService: EventsParticipantsService;

  const mockEventsService = {
    create: jest.fn(),
    findMyEvents: jest.fn(),
    findParticipatingEvents: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    getCategoryType: jest.fn(),
  };

  const mockEventsParticipantsService = {
    create: jest.fn(),
    remove: jest.fn(),
    findParticipants: jest.fn(),
  };

  const mockUserId = 'user123';
  const mockEventId = 'event123';
  const mockAddressId = 'address123';
  const mockUser: UserResponse = { id: mockUserId, firstName: 'Joe', lastName: 'Doe', email: 'joedoe@mail.com', image: "" };
  const mockAddress: Address = { id: mockAddressId, street: 'Calle de la princesa', city: 'Madrid', zip: '28008', country: 'España', createAt: new Date(), updateAt: new Date() };
  const mockCreateEventDto: CreateEventDto = { name: 'Event 1', description: 'descripción', startDate: new Date(), endDate: new Date(), category: CategoryType.Music, capacity: 100, address: mockAddress };
  const mockUpdateEventDto: UpdateEventDto = { name: 'Event 1', description: 'descripción', address: mockAddress };
  const mockEvent = { id: mockEventId, name: 'Event 1', description: 'Description', startDate: new Date(), endDate: new Date(), image: "", category: CategoryType.Music, capacity: 100, organiserId: mockUserId, address: mockAddress, participants: [{ id: "123", userId: mockUserId, eventId: mockUserId, createAt: new Date(), updateAt: new Date(), user: null, event: null }] };
  const mockEventResponse: EventResponse = { id: mockEvent.id, numParticipants: 1, participating: true, name: mockEvent.name, description: mockEvent.description, image: mockEvent.image, startDate: mockEvent.startDate, endDate: mockEvent.endDate, capacity: mockEvent.capacity, category: mockEvent.category, organiserId: mockEvent.organiserId, address: mockEvent.address };
  const mockParticipants = [mockUser];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: mockEventsService },
        { provide: EventsParticipantsService, useValue: mockEventsParticipantsService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
    eventsParticipantsService = module.get<EventsParticipantsService>(EventsParticipantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new event', async () => {
      mockEventsService.create.mockResolvedValue(mockEvent);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.create(req, mockCreateEventDto);

      expect(eventsService.create).toHaveBeenCalledWith(mockUserId, mockCreateEventDto);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('findMyEvents', () => {
    it('should return user-created events', async () => {
      mockEventsService.findMyEvents.mockResolvedValue([mockEvent]);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.findMyEvents(req);

      expect(eventsService.findMyEvents).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findParticipatingEvents', () => {
    it('should return events the user is participating in', async () => {
      mockEventsService.findParticipatingEvents.mockResolvedValue([mockEvent]);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.findParticipatingEvents(req);

      expect(eventsService.findParticipatingEvents).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return event details', async () => {
      mockEventsService.findOne.mockResolvedValue(mockEvent);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.findOne(req, mockEventId);

      expect(eventsService.findOne).toHaveBeenCalledWith(mockEventId);
      expect(result).toEqual(mockEventResponse);
    });
  });

  describe('findParticipants', () => {
    it('should return participants of an event', async () => {
      mockEventsParticipantsService.findParticipants.mockResolvedValue(mockParticipants);

      const result = await controller.findParticipants(mockEventId);

      expect(eventsParticipantsService.findParticipants).toHaveBeenCalledWith(mockEventId);
      expect(result).toEqual(mockParticipants);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      mockEventsService.getCategoryType.mockReturnValue(CategoryType.Music);
      mockEventsService.findAll.mockResolvedValue([mockEvent]);

      const result = await controller.findAll('music');

      expect(eventsService.getCategoryType).toHaveBeenCalledWith('music');
      expect(eventsService.findAll).toHaveBeenCalledWith(CategoryType.Music);
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('update', () => {
    it('should update and return the event', async () => {
      mockEventsService.update.mockResolvedValue(mockEvent);

      const result = await controller.update(mockEventId, mockUpdateEventDto);

      expect(eventsService.update).toHaveBeenCalledWith(mockEventId, mockUpdateEventDto);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('participate', () => {
    it('should add a user as a participant to an event', async () => {
      mockEventsParticipantsService.create.mockResolvedValue(mockEvent);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.participate(req, mockEventId);

      expect(eventsParticipantsService.create).toHaveBeenCalledWith({ eventId: mockEventId, userId: mockUserId });
      expect(result).toEqual(mockEvent);
    });
  });

  describe('unparticipate', () => {
    it('should remove a user as a participant from an event', async () => {
      mockEventsParticipantsService.remove.mockResolvedValue({ raw: [], affected: 1 });

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.unparticipate(req, mockEventId);

      expect(eventsParticipantsService.remove).toHaveBeenCalledWith(mockEventId, mockUserId);
      expect(result).toEqual({ raw: [], affected: 1 });
    });
  });
});