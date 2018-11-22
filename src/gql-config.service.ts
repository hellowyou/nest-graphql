import { Injectable, HttpException } from '@nestjs/common';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';
import { GraphQLFormattedError } from 'graphql';
import { LoggerService, INTERNAL_SERVER_ERROR } from './common';

export interface IFormattedError extends GraphQLFormattedError {
  originalError: HttpException;
}

@Injectable()
export class GqlConfigService {
  constructor(private readonly logger: LoggerService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      typeDefs: [`scalar Upload`],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
        outputAs: 'interface',
      },
      context: this.getContext.bind(this),
      formatError: this.formatError.bind(this),
    };
  }

  getContext({ req }) {
    return { req };
  }

  formatError(err: IFormattedError) {
    const { originalError } = err;
    const isProduction = 'production' === process.env.NODE_ENV;
    let message = originalError.message || 'Internal Server Error.';
    let status = 500;
    let code;

    if (INTERNAL_SERVER_ERROR === err.extensions.code) {
      this.logger.error({ originalError });
    }

    if (originalError instanceof HttpException) {
      status = originalError.getStatus();
      code = originalError.getResponse();
    } else if (isProduction) {
      // If we are in production hide the real error message, and just log for maintenance.
      message = 'Internal Server Error.';
      this.logger.error(originalError);
    }

    this.logger.debug({
      status,
      code,
      message,
      originalError,
    });

    return {
      message,
      status,
      code,
      path: err.path,
      extensions: isProduction ? undefined : err.extensions,
    };
  }
}
