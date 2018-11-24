import { Provider } from '@nestjs/common';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserEntity } from './entities';

export const userProviders: Provider[] = [
  {
    provide: getRepositoryToken(UserEntity),
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [getConnectionToken()],
  },
];
