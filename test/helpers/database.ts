import { ConnectionOptions } from 'typeorm';

export const testConnectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: './tmp/test-db.sqlite',
};
