import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';

@Module({
  // declarations:
  providers: [LoggerService],
  exports: [LoggerService],
})
export class CommonModule {}
