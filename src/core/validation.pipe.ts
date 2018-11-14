import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ModelNotFoundException } from '../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // TODO: Fix not throwing the exception.
    throw new ModelNotFoundException();

    return true;
  }
}

export class ValidationError extends Error {}
