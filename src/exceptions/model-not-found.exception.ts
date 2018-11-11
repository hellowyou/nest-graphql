import { HttpException, HttpStatus } from '@nestjs/common';

export class ModelNotFoundException extends HttpException {
  constructor(message?: string) {
    super('Model not found', HttpStatus.NOT_FOUND);
  }
}
