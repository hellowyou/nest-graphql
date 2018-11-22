import * as jwt from 'jsonwebtoken';
import { Injectable, BadRequestException } from '@nestjs/common';

import { UserEntity } from '../../../modules/user/entities';
import { UserService } from '../../../modules/user/services/user.service';
import { CreateUserDto } from '../../../modules/user/dto';
import { EntityNotFoundException } from '../../../common';

import { JwtPayload } from '../interfaces';

// TODO: Add tests
@Injectable()
export class AuthService {
  private _defaultJwtOptions: jwt.SignOptions = {
    expiresIn: 3600, // 1 hour
  };

  get secret() {
    // TODO: Make a config service to get all the configurations.
    return process.env.APP_SECRET;
  }

  constructor(public readonly userService: UserService) {}

  /**
   * Generates a token for the user.
   *
   * @param {UserEntity} user The user entity.
   * @param {jwt.SignOptions} jwtOpts Jwt sign options.
   * @return {string}
   */
  createToken(user: UserEntity, jwtOpts?: jwt.SignOptions): string {
    const payload: JwtPayload = { uid: user.id };

    return jwt.sign(payload, this.secret, {
      ...this._defaultJwtOptions,
      ...jwtOpts,
    });
  }

  /**
   * Find the user using the given payload.
   *
   * @param {JwtPayload} payload The JWT payload.
   * @return {UserEntity}
   */
  validateUser(payload: JwtPayload): Promise<UserEntity> {
    return this.userService.findOneById(payload.uid);
  }

  /**
   * Validates the credentials given and returns the user entity on success.
   *
   * @param {string} email The email.
   * @param {string} password The password.
   * @return {token}
   */
  async attempt(email, password): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    if (!(await this.userService.validatePassword(password, user.password))) {
      throw new BadRequestException('Invalid email or password.');
    }

    return user;
  }

  async register(userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser({
      ...userData,
    });

    // sendRegistration email here.

    return user;
  }
}
