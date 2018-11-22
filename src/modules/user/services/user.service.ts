import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entities';
import { CreateUserDto } from '../dto/create-user-dto';
import { EntityNotFoundException, LoggerService } from '../../../common';

export interface IFindUsers {
  first: number;
  skip: number;
  after: number;
}

@Injectable()
export class UserService {
  get saltRounds(): number {
    // TODO: Make a config service to get all the configurations.
    let rounds = parseInt(process.env.SALT_ROUNDS, 10);

    if (isNaN(rounds)) {
      rounds = 8;
    }

    return rounds;
  }
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: LoggerService,
  ) {}

  // TODO: Use Dataloader
  findOneById(id: number | string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  // TODO: Use Dataloader
  findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  // TODO: Use Dataloader
  findUsers(options?: IFindUsers): Promise<UserEntity[]> {
    const defaults = {
      skip: 0,
      first: 10,
    };
    const args = Object.assign({}, defaults, options);
    const query = this.userRepository.createQueryBuilder();

    query.limit(args.first).skip(args.skip);

    if (args.after) {
      query.where('id > :id', { id: options.after });
    }

    return query.getMany();
  }

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(data);

    if (data.password) {
      await this.setPassword(user, data.password);
    }

    return this.userRepository.save(user);
  }

  async updateUser(id: number | string, update): Promise<UserEntity> {
    let user = await this.findOneById(id);
    if (!user) {
      throw new EntityNotFoundException('User');
    }

    user = Object.assign({}, user, update);

    if (update.password) {
      await this.setPassword(user, update.password);
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number | string) {
    return this.userRepository.delete(id);
  }

  emailExists(email: string): Promise<boolean> {
    return this.findOneByEmail(email).then(
      user => user && user.email === email,
    );
  }

  createQueryBuilder() {
    return this.userRepository.createQueryBuilder();
  }

  /**
   * Hashes the given password to the given user.
   *
   * @param {UserEntity} user The user entity to set password.
   * @param {string} password The password.
   * @return {Promise<UserEntity>}
   */
  protected async setPassword(
    user: UserEntity,
    password: string,
  ): Promise<UserEntity> {
    user.password = await bcrypt.hash(password, this.saltRounds);

    return user;
  }

  /**
   * Check whether the plain password matches the encrypted string.
   *
   * @param plainPassword The plain password to compare.
   * @param hashedPassword The hashed password to compare.
   * @return {Promise<boolean>}
   */
  validatePassword(plainPassword: string, hashedPassword): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
