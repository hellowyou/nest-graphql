import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoService } from './services/video.service';
import { VideoResolver } from './resolvers/video.resolvers';
import { CommonModule } from '../../common';
import { VideoEntity } from './entities/video.entity';
import { GenreEntity } from './entities/genre.entity';
import { GenreService } from './services/genre.service';
import { GenreResolver } from './resolvers/genre.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity, GenreEntity]), CommonModule],
  providers: [VideoService, GenreService, VideoResolver, GenreResolver],
})
export class VideoModule {}
