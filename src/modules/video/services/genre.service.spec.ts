import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';

describe('GenreService', () => {
  let service: GenreService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService],
    }).compile();
    service = module.get<GenreService>(GenreService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
