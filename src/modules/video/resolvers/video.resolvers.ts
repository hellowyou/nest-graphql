import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Query } from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { CreateVideoDto } from '../dto/create-video-dto';

@Resolver('Video')
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query()
  video(@Args('id') id) {
    return this.videoService.findOneById(id);
  }

  @Query()
  videos(@Args() args) {
    return this.videoService.findVideos(args);
  }

  @Mutation()
  createVideo(@Args('data') data: CreateVideoDto) {
    return this.videoService.createVideo(data);
  }

  @Mutation()
  updateVideo(@Args('data') { id, ...update }) {
    return this.videoService.updateVideo(id, update);
  }

  @Mutation()
  deleteVideo(@Args('id') id) {
    return this.videoService.deleteVideo(id);
  }
}
