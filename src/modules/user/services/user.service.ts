import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../entities';
import { CreateUserDto } from '../dto/create-user-dto';
import { EntityNotFoundException } from '../../../common';

export interface IFindUsers {
  first: number;
  skip: number;
  after: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

    if (await this.emailExists(data.email)) {
      // TODO: make custom error for this.
      throw new Error('Email already exists');
    }

    return this.userRepository.save(user);
  }

  async updateUser(id: number | string, update): Promise<UserEntity> {
    let user = await this.findOneById(id);
    if (!user) {
      throw new EntityNotFoundException('User');
    }

    user = Object.assign({}, user, update);

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
}
