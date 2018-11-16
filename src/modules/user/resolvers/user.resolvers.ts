import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../common';

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
  @UseGuards(AuthGuard)
  createUser(@Args('data') data) {
    return this.userService.createUser(data);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  updateUser(@Args('data') { id, ...update }) {
    return this.userService.updateUser(id, update);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  deleteUser(@Args('id') id) {
    return this.userService.deleteUser(id);
  }
}
