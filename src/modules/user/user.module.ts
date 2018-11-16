import { Module } from '@nestjs/common';
import { UserResolvers } from './resolvers/user.resolvers';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';

@Module({
  imports: [
    // use this so that you can use @InjecRepository(UserEntity)
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserResolvers, UserService],
})
export class UserModule {}
