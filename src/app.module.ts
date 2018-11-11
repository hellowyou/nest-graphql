import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';
import { ExampleModule } from './example/example.module';
import { CoreModule } from './core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    ExampleModule,
    CoreModule,
    AuthModule,
  ],
  controllers: [],
  providers: [GqlConfigService],
})
export class AppModule {}
