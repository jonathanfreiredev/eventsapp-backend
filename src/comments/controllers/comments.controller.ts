import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateReplyDto } from '../dto/create-reply.dto';
import { CommentsService } from '../services/comments.service';
import { RepliesService } from '../services/replies.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly repliesService: RepliesService
  ) { }

  @Get('events/:eventId/comments')
  async findAll(@Param('eventId') eventId: string) {
    return await this.commentsService.findAll(eventId);
  }

  @Post("events/:eventId/comments")
  async create(
    @Request() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const user = req.user;

    return await this.commentsService.create(user.id, eventId, createCommentDto);
  }

  @Post("comments/:commentId/replies")
  async createReply(
    @Request() req: AuthenticatedRequest,
    @Param('commentId') commentId: string,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    const user = req.user;

    return await this.repliesService.create(user.id, commentId, createReplyDto);
  }
}
