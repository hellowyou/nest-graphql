import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';

@Module({
  // declarations:
  // exports: [ValidationPipe]

  providers: [LoggerService],
})
export class CommonModule {}
