import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  logger.log(`NestJs started on http://localhost:${configService.get('PORT')}`);
}
bootstrap();
