import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EntityNotFoundException } from '../../../common';

import { CreateVideoDto } from '../dto/create-video-dto';
import { VideoEntity } from '../entities/video.entity';

export interface IFindVideos {
  first: number;
  skip: number;
  after: number;
}

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}
  // TODO: Use Dataloader
  findOneById(id: number | string): Promise<VideoEntity> {
    return this.videoRepository.findOne(id);
  }

  // TODO: Use Dataloader
  findVideos(options?: IFindVideos): Promise<VideoEntity[]> {
    const defaults = {
      skip: 0,
      first: 10,
    };

    const args = Object.assign({}, defaults, options);
    const query = this.videoRepository.createQueryBuilder();

    query.limit(args.first).skip(args.skip);

    if (args.after) {
      query.where('id > :id', { id: options.after });
    }

    return query.getMany();
  }

  async createVideo(data: CreateVideoDto): Promise<VideoEntity> {
    const user = this.videoRepository.create(data);

    return this.videoRepository.save(user);
  }

  async updateVideo(id: number | string, update): Promise<VideoEntity> {
    let user = await this.findOneById(id);
    if (!user) {
      throw new EntityNotFoundException('Video');
    }

    user = Object.assign({}, user, update);

    return this.videoRepository.save(user);
  }

  async deleteVideo(id: number | string) {
    return this.videoRepository.delete(id);
  }
}
