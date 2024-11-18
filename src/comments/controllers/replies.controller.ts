import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateReplyDto } from '../dto/create-reply.dto';
import { RepliesService } from '../services/replies.service';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    const user = req.user;

    return await this.repliesService.create(user.id, createReplyDto);
  }
}
