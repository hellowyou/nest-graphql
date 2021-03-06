import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LoggerService } from './common';

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV || 'development';

  await app.listen(port);

  const logger = app.get(LoggerService);
  logger.info(`Running on ${env} environment.`);
  logger.info(`Server running on http://localhost:${port}`);
}
bootstrap();
