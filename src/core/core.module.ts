import { Module } from '@nestjs/common';
import { ValidationPipe } from './validation/validation.pipe';

@Module({
  // declarations:
  // exports: [ValidationPipe]
})
export class CoreModule {}
