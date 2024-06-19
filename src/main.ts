import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Pino from 'nestjs-pino';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });

  app.useLogger(app.get(Pino.Logger));
  logger.log('Pino logger Started');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);

  const bullOptions = new DocumentBuilder()
    .setTitle('Bill example')
    .setDescription('The bill API description')
    .setVersion('1.0')
    .addTag('bills')
    .build();
  const billDocument = SwaggerModule.createDocument(app, bullOptions);
  SwaggerModule.setup('swagger', app, billDocument);

  await app.listen(configService.get('PORT'));

  logger.log(`NestJs started on http://localhost:${configService.get('PORT')}`);
}
bootstrap();
