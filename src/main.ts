import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as Pino from 'nestjs-pino';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Pino.Logger));
  const logger = new Logger('Main');
  logger.log('Pino logger Started');
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));

  logger.log(`NestJs started on http://localhost:${configService.get('PORT')}`);
}
bootstrap();
