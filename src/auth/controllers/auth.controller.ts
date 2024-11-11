import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/services/users.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { AuthService } from './../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    return this.authService.generateJWT(user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.authService.generateJWT(user);
  }
}
