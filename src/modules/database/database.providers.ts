import { createConnection, getConnectionOptions } from 'typeorm';
import { Provider } from '@nestjs/common';
import { join } from 'path';
import { merge } from 'lodash';

import { LoggerService, REPOSITORY_TOKENS } from '../../common';

export const databaseProviders: Provider[] = [
  {
    provide: REPOSITORY_TOKENS.DB,
    useFactory: async (logger: LoggerService) => {
      const overrides = {
        entities: [
          join(__dirname, '..', '**', 'entities', '*.entity{.js,.ts}'),
        ],
      };
      const opts = merge(await getConnectionOptions(), overrides);

      logger.info(`Database Options[${REPOSITORY_TOKENS.DB}]: `, opts);

      return await createConnection(opts);
    },
    inject: [LoggerService],
  },
];
