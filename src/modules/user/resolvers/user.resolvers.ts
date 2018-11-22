import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';

// import { AuthGuard } from '../../../common';
import { UserService } from '../services/user.service';
import { CreateUserDataDto, CreateUserDto } from '../dto';
import { GqlAuthGuard } from '../../../common';

@Resolver('User')
export class UserResolvers {
  constructor(private readonly userService: UserService) {}
  @Query()
  async user(@Args('id') id) {
    return this.userService.findOneById(id);
  }

  @Query()
  async users(@Args() { first, skip, after }) {
    return this.userService.findUsers({ first, skip, after });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  @UsePipes(
    new ValidationPipe({ validationError: { target: false, value: false } }),
  )
  // TODO: Validation must return root key 'data' if validation failed.
  createUser(@Args('data') data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Mutation()
  // @UseGuards(AuthGuard)
  updateUser(@Args('data') { id, ...update }) {
    return this.userService.updateUser(id, update);
  }

  @Mutation()
  // @UseGuards(AuthGuard)
  deleteUser(@Args('id') id) {
    return this.userService.deleteUser(id);
  }
}
