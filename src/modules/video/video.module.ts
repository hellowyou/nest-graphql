import { Module } from '@nestjs/common';

import { CommonModule } from '../../common';
import { DatabaseModule } from '../database/database.module';

import { VideoService } from './services/video.service';
import { VideoResolver } from './resolvers/video.resolvers';
import { GenreService } from './services/genre.service';
import { GenreResolver } from './resolvers/genre.resolvers';
import { videoProviders } from './video.providers';

@Module({
  imports: [DatabaseModule, CommonModule],
  providers: [
    ...videoProviders,
    VideoService,
    GenreService,
    VideoResolver,
    GenreResolver,
  ],
})
export class VideoModule {}
