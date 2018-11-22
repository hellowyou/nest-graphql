import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(modelName?: string) {
    super(`${modelName || 'Entity'} not found.`);
  }
}
