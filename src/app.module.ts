import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlConfigService } from './gql-config.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { VideoModule } from './modules/video/video.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    CommonModule,
    UserModule,
    CommonModule,
    AuthModule,
    VideoModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [GqlConfigService],
})
export class AppModule {}
