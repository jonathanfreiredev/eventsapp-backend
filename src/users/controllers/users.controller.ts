import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { getUserResponseDto } from '../lib/users.lib';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findOne(@Request() req: AuthenticatedRequest) {
    const payload = req.user;
    const user = await this.usersService.findOne(payload.id);

    return getUserResponseDto(user);
  }

  @Patch('update/me')
  async update(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const payload = req.user;
    const user = await this.usersService.update(payload.id, updateUserDto);

    return getUserResponseDto(user);
  }
}
