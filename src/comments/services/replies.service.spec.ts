import { Test, TestingModule } from '@nestjs/testing';
import { RepliesService } from './replies.service';
import { CommentsService } from './comments.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reply } from '../entities/reply.entity';

describe('RepliesService', () => {
  let service: RepliesService;
  let repliesRepository: Repository<Reply>;
  let commentsService: CommentsService;
  let usersService: UsersService;

  const mockRepliesRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockCommentsService = {
    findOne: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockUser = {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
  };

  const mockComment = {
    id: 'comment1',
    content: 'This is a comment.',
  };

  const mockReply = {
    id: 'reply1',
    content: 'This is a reply.',
    comment: mockComment,
    repliedBy: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepliesService,
        { provide: getRepositoryToken(Reply), useValue: mockRepliesRepository },
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<RepliesService>(RepliesService);
    repliesRepository = module.get<Repository<Reply>>(getRepositoryToken(Reply));
    commentsService = module.get<CommentsService>(CommentsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a reply', async () => {
      const createReplyDto = { content: 'This is a reply.' };

      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockCommentsService.findOne.mockResolvedValue(mockComment);
      mockRepliesRepository.create.mockReturnValue({ ...createReplyDto });
      mockRepliesRepository.save.mockResolvedValue(mockReply);

      const result = await service.create(mockUser.id, mockComment.id, createReplyDto);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(commentsService.findOne).toHaveBeenCalledWith(mockComment.id);
      expect(repliesRepository.create).toHaveBeenCalledWith(createReplyDto);
      expect(repliesRepository.save).toHaveBeenCalledWith({
        ...createReplyDto,
        comment: mockComment,
        repliedBy: mockUser,
      });
      expect(result).toEqual(mockReply);
    });

    it('should throw an error if user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(
        service.create(mockUser.id, mockComment.id, { content: 'This is a reply.' }),
      ).rejects.toThrow('User not found');

      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
