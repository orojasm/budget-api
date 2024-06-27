import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './common/middlewares/correlation-id.middleware';
import { BillModule } from './bill/bill.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { RecurringBillModule } from './recurring-bill/recurring-bill.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env-dir/.env.${process.env.NODE_ENV}`,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
          },
        },
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlation: req[CORRELATION_ID_HEADER],
          };
        },
        autoLogging: false,
        serializers: {
          req: () => undefined,
          res: () => undefined,
        },
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    BillModule,
    CommonModule,
    RecurringBillModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
