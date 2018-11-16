import { Injectable } from '@nestjs/common';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GqlConfigService {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      tracing: true,
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
        outputAs: 'class',
      },
      context: req => ({ ...req, user: { name: 'UserDummy', id: 1 } }),
    };
  }
}
