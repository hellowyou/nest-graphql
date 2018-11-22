import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserResolvers } from './resolvers/user.resolvers';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { CommonModule, LoggerService } from '../../common';

@Module({
  imports: [
    // use this so that you can use @InjecRepository(UserEntity)
    TypeOrmModule.forFeature([UserEntity]),
    CommonModule,
  ],
  providers: [UserResolvers, UserService],
  exports: [UserService],
})
export class UserModule {}
