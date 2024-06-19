# Generación de un Crud

## Contenido

1. [Crud](#1-crud)
2. [MongoDB](#2-mongodb)
3. [Controller](#3-controller)
4. [Service](#4-service)
5. [Pipe MongoId](#5-pipe-mongoid)
6. [Swagger](#6-swagger)

## 1. Crud

<p align="right"><a href="#top"><img alt="Goto Top" src="https://img.shields.io/badge/Inicio_al_inicio-blue"></a></p>

### 1.1. Generación CRUD

Generamos el CRUD del **Bills** con el comando *nest generate resource*, como resultado se instala la dependencia `@nestjs/mapped-types` y genera el modulo `BillModule` en el directorio **src/bill**.

``` bash
# generar un crud para facturas
nest generate resource bill
```

### 1.2. Instalación validator

``` bash
# instalamos la dependencia requerida
npm i class-validator class-transformer
```

### 1.3. Configuración validator

Creamos una nueva instancia de **ValidationPipe** en el archivo `main.ts`, esto garantiza que todos los puntos finales estén protegidos.

* `whitelist: true,` El validador eliminará del objeto cualquier propiedad que no utilice ningún decorador de validación.
* `forbidNonWhitelisted: true,` Las propiedades no incluidas en la lista, el validador generará una excepción.

Ver la documentación de [NestJS](https://docs.nestjs.com/techniques/validation)

Ademas se configuraron: 
* Se habilito Cors para hacer consultas desde una aplicación local.
* El prefijo de las rutas a `api/v1` en este archivo.

``` typescript

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
```

### 1.4. DTOs

Definir los propiedades y sus validaciones en **create-bill.dto.ts**, y Definir el Bill database key en el archivo **update-bill.dto.ts** ya que este extiende las propiedades de archivo **create-bill.dto.ts**.

``` typescript
import { IsArray, IsNumber, IsPositive, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateBillDto {
  /**
   * The display name for the bill
   */
  @IsString()
  @MinLength(1)
  readonly description: string;

  /**
   * The amount to be paid on this bill
   */
  @IsNumber()
  @IsPositive()
  amount: number;
}
```

``` typescript
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';

export class UpdateBillDto extends PartialType(CreateBillDto) {
  /**
   * Bill database key.
   */
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly _id?: string;
}
```

[Ir al inicio]

## 2. MongoDB

<p align="right"><a href="#top"><img alt="Goto Top" src="https://img.shields.io/badge/Inicio_al_inicio-blue"></a></p>

### 2.1. Instalación

Instalamos la base de datos `MongoDB` y `Mongoose` la herramienta de modelado de objetos de MongoDB más popular.

``` bash
# instalar las dependencias requeridas
npm i @nestjs/mongoose mongoose
```

### 2.2. Configuración de la conexión

Después de la instalación, importamos MongooseModulea en `AppModule`, y configuramos el string de conexión en el método forRootU().

``` typescript
  @Module({
    imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/finance'),
    ],
  })
```

### 2.3. Implementación del Schema (archivo `bill.entity.ts`)

En Mongoose un esquema se asigna a una colección de MongoDB y define la forma de los documentos dentro de esa colección. Los esquemas se pueden crear con decoradores NestJS.

Primero definimos clase (`Bill`) con los atributos de la colección, esta clase extiende de `Document`, y luego exportamos un `Schema` (`BillSchema`) creado a partir la clase.

``` typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bill extends Document {
  /**
   * The display name for the bill
   */
  @Prop()
  description: string;

  /**
   * Projected payment date (DateTime format)
   */
  @Prop()
  paymentDate: string;

  /**
   * Currency to which the value of the bill corresponds
   */
  @Prop()
  currency: string;

  /**
   * The amount to be paid on this bill
   */
  @Prop()
  amount: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
```

### 2.4. Declaración de Schema

En el Module de nuestro Crud definimos nuestro Schema.

``` typescript
  imports: [
    MongooseModule.forFeature([
      { name: Bill.name, schema: BillSchema },
    ]),
  ],
```

[Ir al inicio]

## 3. Controller

<p align="right"><a href="#top"><img alt="Goto Top" src="https://img.shields.io/badge/Inicio_al_inicio-blue"></a></p>

El controller fue creado al generar el resource CRUD.

En MongoDB el atributo `_id` (**database key**) debe ser un **string UUID**, por lo tanto debemos modificar la definición de este parámetro en los métodos `findOne`, `update` y `remove`.

``` typescript
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.billService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    return this.billService.update(id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.billService.remove(id);
  }
```

[Ir al inicio]

## 4. Service

<p align="right"><a href="#top"><img alt="Goto Top" src="https://img.shields.io/badge/Inicio_al_inicio-blue"></a></p>

Inyectamos nuestro modelo `Model<Bill>`, nótese que usamos el decorador @InjectModel(Bill.name), ya que este no es un provider.

por otro lado implementamos los metodos `create`, `findAll`


``` typescript
@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name)
    private readonly billModel: Model<Bill>,
  ) {}

  private readonly logger = new Logger(BillService.name);

  async create(createBillDto: CreateBillDto) {
    try {
      const bill = await this.billModel.create(createBillDto);
      this.logger.log(bill.$model);
      return bill;
    } catch (error) {
      this.handleDbException(error, createBillDto.description);
    }
  }

  async findAll() {
    const bills = await this.billModel.find();
    return bills;
  }

  async findOne(id: string) {
    const bill: Bill = await this.billModel.findById(id);
    return bill;
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    const bill = await this.findOne(id);

    try {
      const newBill = await bill.updateOne(updateBillDto, { new: true });
      console.log(newBill);
      return { ...bill, ...updateBillDto };
    } catch (error) {
      this.handleDbException(error, updateBillDto.description);
    }
  }

  async remove(id: string) {
    const bill = await this.billModel.findByIdAndDelete(id);
    if (!bill) {
      throw new BadRequestException(`Bill with id ${id} not found`);
    }

    return bill;
  }

  private handleDbException(error: any, description: string) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Bill ${JSON.stringify(error.keyValue)} already exists in the database`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create or update Bill ${description} - Check server log`,
    );
  }
}
```

[Ir al inicio]

## 5. Pipe MongoId

<p align="right"><a href="#top"><img alt="Goto Top" src="https://img.shields.io/badge/Inicio_al_inicio-blue"></a></p>

### 5.1. Generación

Generamos el modulo CommonModulo

``` bash
# generación del modulo
nest generate module common

# generación del pipe
nest generate pipe common/pipes/parseMongoId --flat
```

### 5.2 Implementación

Se creo un el pipe ParseMongoIdPipe, el cual valida si el parámetros es in id valido para MongoDb

``` typescript
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`The /${value} is not the valid MongoID.`);
    }

    return value;
  }
}
```

[Ir al inicio]

## 6. Swagger

<p align="right"><a href="#top"><img alt="Goto Top" src="https://img.shields.io/badge/Inicio_al_inicio-blue"></a></p>

### 6.1. Instalación

``` bash
# instalar las dependencias requeridas
npm install --save @nestjs/swagger
```

### 6.2. Configuración

Para hacer una configuración básica de Swagger, simplemente debemos indicarle al modulo `SwaggerModule`, las opciones para usar en la documentación  en el archivo `main.ts`.

``` typescript

  const bullOptions = new DocumentBuilder()
    .setTitle('Bill example')
    .setDescription('The bill API description')
    .setVersion('1.0')
    .addTag('bills')
    .build();
  const billDocument = SwaggerModule.createDocument(app, bullOptions);
  SwaggerModule.setup('swagger', app, billDocument);

```

[Ir al inicio]

[Ir al inicio]: <#top>



