# Variables de entorno

Para validar y gestionar de forma sencilla las variables de entorno utilizaremos `@nestjs/config` y el paquete JOI.

Primero instalaremos y configuraremos `@nestjs/config` ver la sección [4. Configuración de NestJS](setup_initial.md#4-configuración) del archivo setup_initial.md.

## Instalar JOI

``` bash
# instalamos la dependencia requerida
npm install joi
```

## Configuración

Usaremos dos archivos: ___joivalidation.ts___ en el que definiremos nuestras validaciones y valores por defecto, y ___env.configuration.ts___  en el cual definiremos una función de acceso a nuestras variable.  ver los siguientes ejemplos:

**joivalidation.ts**
``` typescript
import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3003),
  MONGODB: Joi.required(),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DEFAULT_LIMIT: Joi.number().default(4),
});
```

**env.configuration.ts**
``` typescript
export const EnvConfiguration = () => ({
  environment: process.env.NODE_EN,
  port: process.env.PORT,
  mongodb: process.env.MONGODB,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  defaultLimit: process.env.DEFAULT_LIMIT,
});
```

## Configurando el AppModule.

En el llamado al método ConfigModule.forRoot(), usaremos las opciones `load: [EnvConfiguration]` y `validationSchema: JoiValidationSchema`, para activar estas validaciones. 

**app.module.ts**
``` typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Uso

En los fuentes de nuestra aplicación acedemos a los valores de ___.env___ con un simple llamado al método `this.defaultLimit = configService.get<number>('defaultLimit');`. 

``` typescript
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bill } from './entities/bill.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BillService {
  defaultLimit: number;
  constructor(
    @InjectModel(Bill.name)
    private readonly billModel: Model<Bill>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    const bills = await this.billModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ dueDate: 1 })
      .select('-__v');
    return bills;
  }

}
```
