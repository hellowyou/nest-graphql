import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExampleResolvers } from './example.resolvers';
import { LoggingInterceptor } from '../core';

@Module({
  providers: [
    ExampleResolvers,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class ExampleModule {}
