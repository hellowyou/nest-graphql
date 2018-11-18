import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(modelName?: string) {
    super(`${modelName || 'Entity'} not found.`, HttpStatus.NOT_FOUND);
  }
}
