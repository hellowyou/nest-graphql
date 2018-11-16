import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EntityNotFoundException } from '../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // TODO: Fix not throwing the exception.
    throw new EntityNotFoundException();

    return true;
  }
}

export class ValidationError extends Error {}
