import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  fields: ValidationError[];

  constructor(validationErrors: ValidationError[] = []) {
    super(`Please provide the correct data`, HttpStatus.BAD_REQUEST);
    this.fields = validationErrors;
  }
}
