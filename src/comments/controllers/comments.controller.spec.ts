import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from '../services/comments.service';
import { RepliesService } from '../services/replies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateReplyDto } from '../dto/create-reply.dto';

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;
  let repliesService: RepliesService;

  const mockCommentsService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const mockRepliesService = {
    create: jest.fn(),
  };

  const mockEventId = 'event123';
  const mockCommentId = 'comment123';
  const mockReplyId = 'reply123';
  const mockUserId = 'user123';
  const mockCreateCommentDto: CreateCommentDto = { content: 'Esto es un comentario' };
  const mockCreateReplyDto: CreateReplyDto = { content: 'Esto es una respuesta' };
  const mockComment = { id: mockCommentId, content: mockCreateCommentDto.content, userId: mockUserId };
  const mockReply = { id: mockReplyId, content: mockCreateReplyDto.content, userId: mockUserId };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: RepliesService, useValue: mockRepliesService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
    repliesService = module.get<RepliesService>(RepliesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all comments for an event', async () => {
      mockCommentsService.findAll.mockResolvedValue([mockComment]);

      const result = await controller.findAll(mockEventId);

      expect(commentsService.findAll).toHaveBeenCalledWith(mockEventId);
      expect(result).toEqual([mockComment]);
    });
  });

  describe('create', () => {
    it('should create a new comment for an event', async () => {
      mockCommentsService.create.mockResolvedValue(mockComment);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.create(req, mockEventId, mockCreateCommentDto);

      expect(commentsService.create).toHaveBeenCalledWith(mockUserId, mockEventId, mockCreateCommentDto);
      expect(result).toEqual(mockComment);
    });
  });

  describe('createReply', () => {
    it('should create a new reply for a comment', async () => {
      mockRepliesService.create.mockResolvedValue(mockReply);

      const req = { user: { id: mockUserId } } as AuthenticatedRequest;
      const result = await controller.createReply(req, mockCommentId, mockCreateReplyDto);

      expect(repliesService.create).toHaveBeenCalledWith(mockUserId, mockCommentId, mockCreateReplyDto);
      expect(result).toEqual(mockReply);
    });
  });
});
