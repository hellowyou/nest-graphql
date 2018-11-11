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
        path: join(process.cwd(), 'src/graphql.d.ts'),
        outputAs: 'class',
      },
      context: (req) => ({ ...req, user: { name: 'UserDummy', id: 1 } }),
  	};
	}
}
