import { Injectable } from '@nestjs/common';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GqlConfigService {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
        outputAs: 'interface',
      },
      context: this.getContext,
      formatError: this.formatError,
    };
  }

  getContext(req) {
    return { ...req, user: { name: 'UserDummy', id: 1 } };
  }

  formatError(err) {
    const { originalError } = err;
    const data = originalError.fields || [];

    return {
      ...err,
    };
  }
}
