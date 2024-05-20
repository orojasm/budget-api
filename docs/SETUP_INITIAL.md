# Configuración inicial del proyecto

## Contenido

1. [Creación del proyecto](#1-crear-el-proyecto)
2. [Configuración de Git y github](#2-configuración-de-git-y-github)
3. [Configuración de NestJs](#3-configuración)

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

En Local movemos todos los archivos al staging area y creamos el commit inicial (con el estándar de Conventional Commits).

```bash
git add .
git commit -m "chore(config): :tada: initial commit"
```

Definimos el repositorio budget-api en Github y conectamos nuestro repositorio local a github

```bash
git remote add origin git@github.com:orojasm/budget-api.git
git push -u origin main
```
Definimos la rama release y sincronizarla con github

```bash
git branch release
git checkout release
git push -u origin release
```

Definimos la rama develop y sincronizarla con github

```bash
git branch develop
git checkout develop
git push -u origin develop
```

Definimos la rama feature/initial_setup

```bash
git branch feature/initial_setup
git checkout feature/initial_setup
```

[Ir al inicio]

## 3. Configuración

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

`const logger = new Logger();`





Por ultimo, adicionamos la variable de entorno NODE_ENV a los comandos de in inicio de NestJs en el archivo `package.json`  

``` json
    "start": "export NODE_ENV=development && nest start",
    "start:dev": "export NODE_ENV=development && nest start --watch",
    "start:debug": "export NODE_ENV=development && nest start --debug --watch",
    "start:prod": "export NODE_ENV=production && node dist/main",
```

[Ir al inicio]

[Ir al inicio]: <#top>