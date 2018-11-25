import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';

import { GqlAuthGuard, NO_TARGET_VALUES } from '../../../common';

import { UserService } from '../services/user.service';
import { CreateUserDataDto, UpdateUserDataDto } from '../dto';

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
  @UsePipes(new ValidationPipe({ validationError: NO_TARGET_VALUES }))
  createUser(@Args() args: CreateUserDataDto) {
    return this.userService.createUser(args.data);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  @UsePipes(new ValidationPipe({ validationError: NO_TARGET_VALUES }))
  updateUser(@Args() { data: { id, ...update } }: UpdateUserDataDto) {
    return this.userService.updateUser(id, update);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  deleteUser(@Args('id') id) {
    return this.userService.deleteUser(id);
  }
}
