import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserResolvers } from './resolvers/user.resolvers';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { CommonModule, LoggerService } from '../../common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [
    // use this so that you can use @InjecRepository(UserEntity)
    // TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule,
    CommonModule,
  ],
  providers: [...userProviders, UserResolvers, UserService],
  exports: [UserService],
})
export class UserModule {}
