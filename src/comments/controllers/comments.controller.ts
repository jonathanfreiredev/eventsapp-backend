import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const user = req.user;

    return await this.commentsService.create(user.id, createCommentDto);
  }
}
