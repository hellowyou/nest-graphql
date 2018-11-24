import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { VideoService } from './video.service';
import { VideoEntity } from '../entities';

describe('VideoService', () => {
  let service: VideoService;
  const mockRepository = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getRepositoryToken(VideoEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<VideoService>(VideoService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
