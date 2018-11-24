import { Provider } from '@nestjs/common';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { VideoEntity } from './entities/video.entity';
import { GenreEntity } from './entities/genre.entity';

export const videoProviders: Provider[] = [
  {
    provide: getRepositoryToken(VideoEntity),
    useFactory: (connection: Connection) =>
      connection.getRepository(VideoEntity),
    inject: [getConnectionToken()],
  },
  {
    provide: getRepositoryToken(GenreEntity),
    useFactory: (connection: Connection) =>
      connection.getRepository(GenreEntity),
    inject: [getConnectionToken()],
  },
];
