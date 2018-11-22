import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolvers } from './resolvers/auth.resolvers';
import { UserModule } from '../../modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy, AuthResolvers],
})
export class AuthModule {}
