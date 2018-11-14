import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';
import { ExampleModule } from './example/example.module';
import { CoreModule } from './core';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    TypeOrmModule.forRoot(),
    ExampleModule,
    CoreModule,
    AuthModule,
  ],
  controllers: [],
  providers: [GqlConfigService],
})
export class AppModule {}
