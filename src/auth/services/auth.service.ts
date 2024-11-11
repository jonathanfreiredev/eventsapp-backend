import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginResponse } from '../dto/login-response';
import { AuthenticatedUser } from '../interfaces/authenticated-request.interface';
import { PayloadToken } from '../interfaces/token.interface';
import { UsersService } from './../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...res } = user;
        return res;
      }
    }
    return null;
  }

  generateJWT(user: AuthenticatedUser): LoginResponse {
    const payload: PayloadToken = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }
}
