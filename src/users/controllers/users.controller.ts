import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getUserResponseDto } from '../lib/users.lib';
import { UsersService } from '../services/users.service';
import { UsersFavouriteEventsService } from '../services/users-favourite-events.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    private readonly usersFavouriteEventsService: UsersFavouriteEventsService
  ) { }

  @Get('me')
  async findOne(@Request() req: AuthenticatedRequest) {
    const payload = req.user;
    const user = await this.usersService.findOne(payload.id);

    return getUserResponseDto(user);
  }

  @Put('me')
  async update(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const payload = req.user;
    const user = await this.usersService.update(payload.id, updateUserDto);

    return getUserResponseDto(user);
  }
  
  @Post('favourite/:eventId')
  async favouriteEvent(
    @Request() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
  ) {
    const payload = req.user;
    return await this.usersFavouriteEventsService.create(payload.id, eventId);
  }

  @Delete('favourite/:eventId')
  async unfavouriteEvent(
    @Request() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
  ) {
    const payload = req.user;
    return await this.usersFavouriteEventsService.remove(payload.id, eventId);
  }

  @Get('favourite-events')
  async findFavouriteEvents(@Request() req: AuthenticatedRequest) {
    const payload = req.user;
    return await this.usersFavouriteEventsService.findFavouriteEvents(payload.id);
  }

  @Get('favourite-events/:eventId')
  async isFavouriteEvent(
    @Request() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
  ) {
    const payload = req.user;
    return await this.usersFavouriteEventsService.isFavouriteEvent(payload.id, eventId);
  }
}
