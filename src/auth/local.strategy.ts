/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super({
        usernameField: 'email',
        passwordField: 'password',
      });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authservice.validateDoctor(email, password);

    if (!user) {
        throw new UnauthorizedException();
    }

    return user;
  }
}
