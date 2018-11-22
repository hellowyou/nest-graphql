import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';

import { REPOSITORY_TOKENS } from '../../common';

import { VideoEntity } from './entities/video.entity';
import { GenreEntity } from './entities/genre.entity';

export const videoProviders: Provider[] = [
  {
    provide: REPOSITORY_TOKENS.VIDEO,
    useFactory: (connection: Connection) =>
      connection.getRepository(VideoEntity),
    inject: [REPOSITORY_TOKENS.DB],
  },
  {
    provide: REPOSITORY_TOKENS.GENRE,
    useFactory: (connection: Connection) =>
      connection.getRepository(GenreEntity),
    inject: [REPOSITORY_TOKENS.DB],
  },
];
