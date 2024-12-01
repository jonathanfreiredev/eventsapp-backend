import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';
import config from '../../config';
import { PayloadToken } from '../interfaces/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    @Inject(UsersService) private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: PayloadToken) {
    const userData = await this.usersService.findOne(payload.sub);

    if (!userData) {
      throw new UnauthorizedException('User not allowed');
    }

    const { password, ...user } = userData;

    if (!user) {
      throw new UnauthorizedException('User not allowed');
    }

    return user;
  }
}
