import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '../../../modules/user/entities';

import { AuthService } from '../services';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authService.secret,
    });
  }

  async validate(
    payload: JwtPayload,
    done: (err: Error | null, data: UserEntity | boolean) => void,
  ) {
    console.log({ payload }); // tslint:disable-line
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
