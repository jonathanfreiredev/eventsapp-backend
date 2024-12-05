import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { EventsService } from 'src/events/services/events.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentsRepository: Repository<Comment>;
  let usersService: UsersService;
  let eventsService: EventsService;

  const mockCommentsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
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

  const mockComment = {
    id: 'comment1',
    content: 'Great event!',
    event: mockEvent,
    commentedBy: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Comment), useValue: mockCommentsRepository },
        { provide: EventsService, useValue: mockEventsService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    usersService = module.get<UsersService>(UsersService);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a comment', async () => {
      const createCommentDto = { content: 'Great event!' };

      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockEventsService.findOne.mockResolvedValue(mockEvent);
      mockCommentsRepository.create.mockReturnValue({ ...createCommentDto });
      mockCommentsRepository.save.mockResolvedValue(mockComment);

      const result = await service.create(mockUser.id, mockEvent.id, createCommentDto);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(eventsService.findOne).toHaveBeenCalledWith(mockEvent.id);
      expect(commentsRepository.create).toHaveBeenCalledWith(createCommentDto);
      expect(commentsRepository.save).toHaveBeenCalledWith({
        ...createCommentDto,
        event: mockEvent,
        commentedBy: mockUser,
      });
      expect(result).toEqual(mockComment);
    });

    it('should throw an error if user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(
        service.create(mockUser.id, mockEvent.id, { content: 'Great event!' }),
      ).rejects.toThrow('User not found');

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('findOne', () => {
    it('should find and return a comment by ID', async () => {
      mockCommentsRepository.findOne.mockResolvedValue(mockComment);

      const result = await service.findOne('comment1');

      expect(commentsRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'comment1' },
      });
      expect(result).toEqual(mockComment);
    });
  });

  describe('findAll', () => {
    it('should return all comments for a given event', async () => {
      const mockComments = [
        mockComment,
        { id: 'comment2', content: 'Nice event!', event: mockEvent, commentedBy: mockUser },
      ];

      mockCommentsRepository.find.mockResolvedValue(mockComments);

      const result = await service.findAll('event1');

      expect(commentsRepository.find).toHaveBeenCalledWith({
        where: { event: { id: 'event1' } },
        relations: ['commentedBy', 'replies', 'replies.repliedBy'],
      });
      expect(result).toEqual(mockComments);
    });
  });
});
