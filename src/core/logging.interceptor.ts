import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const { fieldName } = ctx.getInfo();
    const now = Date.now();

    console.log(`Before ${fieldName}...`);

    return call$.pipe(
      tap(() => console.log(`After ${fieldName}... ${Date.now() - now}ms`))
    );
  }
}
