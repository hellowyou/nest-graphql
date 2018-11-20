import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    TypeOrmModule.forRoot(),
    CommonModule,
    UserModule,
    CommonModule,
    AuthModule,
    VideoModule,
  ],
  controllers: [],
  providers: [GqlConfigService],
})
export class AppModule {}
