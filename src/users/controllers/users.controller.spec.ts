import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../auth/interfaces/authenticated-request.interface';
import { UserFavouriteEvent } from '../entities/user-favourite-event.entity';
import { UserResponse } from '../interfaces/user-response.interface';
import { UsersFavouriteEventsService } from '../services/users-favourite-events.service';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import { DeleteResult } from 'typeorm';
import { CategoryType, Event } from '../../events/entities/event.entity';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let usersFavouriteEventsService: UsersFavouriteEventsService;

  const mockUsersService = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockUsersFavouriteEventsService = {
    create: jest.fn(),
    remove: jest.fn(),
    findFavouriteEvents: jest.fn(),
    isFavouriteEvent: jest.fn(),
  };

  const mockUserId = 'user123';
  const mockEventId = 'event123';
  const mockUser: UserResponse = { id: mockUserId, firstName: 'Joe', lastName: 'Doe', email: 'joedoe@mail.com', image: "" };
  const mockUpdatedUser: UserResponse = { id: mockUserId, firstName: 'Jonathan', lastName: 'Doe', email: 'joedoe@mail.com', image: "" };
  const mockEvent: Event = { 
    id: mockEventId,
    name: 'Event 1', 
    description: 'Descripción del evento', 
    startDate: new Date(), 
    endDate: new Date(), 
    address: null, 
    participants: [], 
    capacity: 100, 
    category: CategoryType.Music,
    organiserId: mockUserId,
    image: '',
    favouriteOfUsers: [],
    organiser: mockUser as User,
    comments: [],
    createAt: new Date(), 
    updateAt: new Date()
  };
  const mockFavouriteEvent: UserFavouriteEvent = { 
    id: '1', 
    userId: mockUserId, 
    eventId: mockEventId, 
    event: null,
    user: null, 
    createAt: new Date(), 
    updateAt: new Date() 
  };
  const mockFavouriteEvents = [mockEvent];
  const mockDeletedFavouriteEvent: DeleteResult = { raw: [], affected: 1 };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: UsersFavouriteEventsService, useValue: mockUsersFavouriteEventsService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    usersFavouriteEventsService = module.get<UsersFavouriteEventsService>(UsersFavouriteEventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the user details', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.findOne(req);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      mockUsersService.update.mockResolvedValue(mockUpdatedUser);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const dto = { firstName: 'Jonathan' };
      const result = await controller.update(req, dto);

      expect(usersService.update).toHaveBeenCalledWith(mockUserId, dto);
      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe('favouriteEvent', () => {
    it('should add an event to favourites', async () => {
      mockUsersFavouriteEventsService.create.mockResolvedValue(mockFavouriteEvent);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.favouriteEvent(req, mockEventId);

      expect(usersFavouriteEventsService.create).toHaveBeenCalledWith(mockUserId, mockEventId);
      expect(result).toEqual(mockFavouriteEvent);
    });
  });

  describe('unfavouriteEvent', () => {
    it('should remove an event from favourites', async () => {
      mockUsersFavouriteEventsService.remove.mockResolvedValue(mockDeletedFavouriteEvent);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.unfavouriteEvent(req, mockEventId);

      expect(usersFavouriteEventsService.remove).toHaveBeenCalledWith(mockUserId, mockEventId);
      expect(result).toEqual(mockDeletedFavouriteEvent);
    });
  });

  describe('findFavouriteEvents', () => {
    it('should return the user\'s favourite events', async () => {
      mockUsersFavouriteEventsService.findFavouriteEvents.mockResolvedValue(mockFavouriteEvents);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.findFavouriteEvents(req);

      expect(usersFavouriteEventsService.findFavouriteEvents).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockFavouriteEvents);
    });
  });

  describe('isFavouriteEvent', () => {
    it('should check if an event is favourited', async () => {
      mockUsersFavouriteEventsService.isFavouriteEvent.mockResolvedValue(true);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest
      const result = await controller.isFavouriteEvent(req, mockEventId);

      expect(usersFavouriteEventsService.isFavouriteEvent).toHaveBeenCalledWith(mockUserId, mockEventId);
      expect(result).toEqual(true);
    });
  });
});