import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { GenreEntity } from '../entities';

import { GenreService } from './genre.service';

describe('GenreService', () => {
  let service: GenreService;
  const mockRepository = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(GenreEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<GenreService>(GenreService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
