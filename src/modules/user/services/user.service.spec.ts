import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggerService } from '../../../common';
import { UserEntity } from '../entities';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
        LoggerService,
        UserService,
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
