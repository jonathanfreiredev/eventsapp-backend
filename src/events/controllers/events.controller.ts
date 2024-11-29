import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { getEventResponseDto } from '../lib/events.lib';
import { EventsParticipantsService } from '../services/events-participants.service';
import { EventsService } from '../services/events.service';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService, 
    private readonly eventsParticipantsService: EventsParticipantsService
  ) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createEventDto: CreateEventDto,
  ) {
    const payload = req.user;
    return await this.eventsService.create(payload.id, createEventDto);
  }

  @Get("my-events")
  async findMyEvents(@Request() req: AuthenticatedRequest) {
    const payload = req.user;
    return await this.eventsService.findMyEvents(payload.id);
  }

  @Get("participating")
  async findParticipatingEvents(@Request() req: AuthenticatedRequest) {
    const payload = req.user;
    return await this.eventsService.findParticipatingEvents(payload.id);
  }

  @Get(':id')
  async findOne(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    const payload = req.user;
    const event = await this.eventsService.findOne(id);

    return getEventResponseDto(event, payload.id);
  }

  @Get(':id/participants')
  async findParticipants(@Param('id') id: string) {
    return await this.eventsParticipantsService.findParticipants(id);
  }

  @Get()
  async findAll(@Query('category') category: string | null) {
    const categoryType = this.eventsService.getCategoryType(category);
    return await this.eventsService.findAll(categoryType);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Post(':id/participate')
  async participate(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    const payload = req.user;
    return await this.eventsParticipantsService.create({
      eventId: id,
      userId: payload.id,
    })
  }

  @Delete(':id/participate')
  async unparticipate(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    const payload = req.user;
    return await this.eventsParticipantsService.remove(id, payload.id);
  }
}
