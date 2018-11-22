import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';

import { REPOSITORY_TOKENS } from '../../common';
import { UserEntity } from './entities';

export const userProviders: Provider[] = [
  {
    provide: REPOSITORY_TOKENS.USER,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [REPOSITORY_TOKENS.DB],
  },
];
