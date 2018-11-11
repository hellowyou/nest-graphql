import { UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ValidationPipe, AuthGuard, User } from '../core';

@Resolver('Author')
export class ExampleResolvers {
  constructor() {}

  @Query()
  async ctxUser(@User() user) {
    return `User is ${JSON.stringify(user)}`;
  }

  @Query()
  @UseGuards(new AuthGuard)
  async forbidden() {
    return 'Welcome, you\'ve hacked your way through.';
  }

  @Query()
  async allowed() {
    return 'You are allowed for this query.';
  }

  @Query()
  @UsePipes(new ValidationPipe)
  async validationError() {
    return 'Validation error.';
  }

  @Query()
  async hello(@Args('name') name: string) {
    return `Hellow ${name || 'world'}`;
  }
}
