// External Libraries.
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  NotImplementedException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
// From Other modules.
import { SigninInput, AuthStrategy } from '../../../generated/graphql';
// Own modules.
import { AuthService } from '../services';
import { SignupDto } from '../dto';

// TODO: Add tests
@Resolver('AuthPayload')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async signin(@Args('data') data: SigninInput) {
    const user = await this.authService.attempt(data.email, data.password);

    return {
      token: this.authService.createToken(user),
      user,
    };
  }

  @Mutation()
  @UsePipes(new ValidationPipe())
  async signup(@Args('data') { strategy, ...input }: SignupDto) {
    // TODO: Handle different strategy like facebook.
    if (strategy !== AuthStrategy.EMAIL_PASSWORD) {
      throw new NotImplementedException(
        `${strategy} is yet to be implemented.`,
      );
    }

    const user = await this.authService.register(input);
    const token = this.authService.createToken(user);
    return { token, user };
  }
}
