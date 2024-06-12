# Configuración inicial del proyecto

## Contenido

1. [Creación del proyecto](#1-crear-el-proyecto)
2. [Configuración de Git y Github](#2-configuración-de-git-y-github)
3. [Uso de Branch en Git](#3-uso-de-branch-en-git)
4. [Configuración de NestJs](#4-configuración)
5. [Usar el Logger de Pino](#5-usar-el-logger-de-pino)
6. [Implementar CorrelationId](#6-implementar-correlationid)


## 1. Crear el proyecto
Para crear un nuevo proyecto necesitamos tener instalado NestJs cli.

```bash
npm i -g @nestjs/cli 
```

Luego procedemos a crear un nuevo proyecto, utilizando NestJs cli, durante la instalación seleccione npm como gestor de paquetes.

```bash
nest new budget-api 
```

* Una vez termine la instalación: 
* Nos cambiamos al directorio del proyecto.
* Iniciamos vscode.
* Arrancamos la aplicación.

```bash
cd budget-api
code .
npm run start:dev
```
Y finalmente desde un navegador vamos al la dirección http://localhost:3000/, para verificar que nuestra api esta corriendo de satisfactoriamente.

[Ir al inicio]

## 2. Configuración de Git y Github

### Commit Inicial

En Local movemos todos los archivos al staging area y creamos el commit inicial (con el estándar de Conventional Commits).

```bash
git add .
git commit -m "chore(config): :tada: initial commit"
```

### Repositorio

Definimos el repositorio budget-api en Github y conectamos nuestro repositorio local a github

```bash
git remote add origin git@github.com:orojasm/budget-api.git
git push -u origin main
```

### Branch Release

Definimos la rama release y sincronizarla con github

```bash
git branch release
git checkout release
git push -u origin release
```

### Branch Develop

Definimos la rama develop y sincronizarla con github

```bash
git branch develop
git checkout develop
git push -u origin develop
```

### Branch feature/initial_setup

Definimos la rama feature/initial_setup

```bash
git branch feature/initial_setup
git checkout feature/initial_setup
```

## 3. Uso de Branch en Git

1. Lista todas las ramas

``` bash
git branch --list --all -v
```

2. Definir la rama feature/new_feature

``` bash
# primer método
git branch --list --all
git checkout develop
git branch feature/new_feature
git checkout feature/new_feature

# O el método abreviado
git checkout develop
git checkout -b feature/new_feature
```

3. Adicionar archivos y hacer un commit

``` bash
git add .
git status
git commit -m "«new feature»"
```

4. Adicionar un archivo al commit actual

``` bash
git add «file»
git status
git commit --amend --no-edit
```

5. Subir la rama feature/new_feature

``` bash
git push origin feature/new_feature
```

6. Hacer el pull request

7. Sincroniza la rama develop del remoto en el local
``` bash
git checkout develop
git pull origin develop
```

* Otros comandos
  * ver el log de git
``` bash
git log --graph --all --since=2024-01-01 
```
* 
  * Renombrar una rama
``` bash
git branch -m feature/initial feature/initial_setup
```

[Ir al inicio]

## 4. Configuración

Para utilizar diferentes ajustes de configuración por ambientes, la mejor práctica es almacenar las variables de configuración en el entorno en archivos separados.

Lo primero es instalar la dependencia requerida.

```bash
npm i --save @nestjs/config
```

Una vez instalado el modulo de configuración, procedemos a su definición e inicialización en el archivo `app.module.ts`, en la inicialización le informamos que el archivo lo encuentra en el path `.env/.env.$NODE_ENV`.

```bash
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
Luego podemos proceder a modificar el archivo de inicio de NestJs (`main.ts`),
* Primero adicionamos el logger, para mostrar la url de la aplicación.
* inicializamos el ConfigService, para poder usar la variable de entorno `PORT`.

```bash
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
```

Por ultimo, adicionamos la variable de entorno NODE_ENV a los comandos de in inicio de NestJs en el archivo `package.json`  

``` json
    "start": "export NODE_ENV=development && nest start",
    "start:dev": "export NODE_ENV=development && nest start --watch",
    "start:debug": "export NODE_ENV=development && nest start --debug --watch",
    "start:prod": "export NODE_ENV=production && node dist/main",
```

[Ir al inicio]

## 5. Usar el Logger de Pino

### Instalación

Comenzamos instalado las dependencias necesarias para usar el Logger Pino.

``` bash
# Dependencias del logger de pino
npm install nestjs-pino pino-http
# Formateo de los logger de pino
npm install -D pino-pretty
```

### Configuración

Importar el LoggerModule desde nestjs-pino.

Configurar las siguientes opciones de Pino.

* Le indicamos a Pino que en la capa de transporte se debe mostrar el ``messageKey: 'message'``, de acuerdo al formato de ``pino-pretty``
* Definimos el ``messageKey``
* Indicamos que no se debe generar contenido par parte de Pino ``autoLogging: false,``
* Finalmente en la opción ``serializers: { .. }``, le indicamos a Pino que no genere ni el Request ni el Response.


``` typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`,
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
        autoLogging: false,
        serializers: {
          req: () => undefined,
          res: () => undefined,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

### Inicialización

Inicializamos Pino en main.ts: Después de la instalar y configurar Pino, procedemos se puede incorporar a su aplicación NestJS a través de su archivo main.ts

* Importamos Pino y Logger de NestJS
* Le indicamos a express que use el Logger de Pino (``app.useLogger(app.get(Pino.Logger));``)
* y por último insertamos dos mensajes en el logger

``` typescript
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
```

###  Uso

* Por ejemplo en el ***app.controller.ts***, se crea una instancia del logger ``private readonly logger = new Logger(AppController.name);``
* durante la ejecución de una petición se escribe en el logger un mensaje ``this.logger.log({ message: 'Start getHello' });``

``` typescript
import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log({ message: 'Start getHello' });
    const response = this.appService.getHello();
    this.logger.log({ message: 'Finish getHello' });
    return response;
  }
}

```

[Ir al inicio]

## 6. Implementar CorrelationId

### CorrelationIdMiddleware

Creamos un el Middleware CorrelationIdMiddleware, el cual va a generar un CORRELATION_ID y lo va a poner en rl request y el response.

``` typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

export const CORRELATION_ID_HEADER = 'X-Correlation-Id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = randomUUID();

    req[CORRELATION_ID_HEADER] = id;
    res.set(CORRELATION_ID_HEADER, id);

    next();
  }
}
```

### Adicionar el CORRELATION_ID al Logger

Le indicamos al Logger que debe mostrar el 'X-Correlation-Id' que se encuentra el el request, esto se lo indicamos en la opción ``customProps`` de la configuración del LoggerModule en el archivo app.modulo.

Ademas le indicamos a la clase AppModule que aplique el consumer ``CorrelationIdMiddleware`` a todas las rutas.

``` typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './common/middlewares/correlation-id.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
```


[Ir al inicio]

## fin

[Ir al inicio]: <#top>