# Budget API

This app a free and open source personal finance manager. It is important to note that best programming practices were used in this application.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://nodejs.org/en" target="_blank">
    <img alt="NodeJS" src="https://img.shields.io/badge/node-v20.14.0-blue">
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img alt="Package License" src="https://img.shields.io/npm/l/@nestjs/core.svg"/>
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Cover" />
  </a>
  <a href="https://nestjs.com/" target="_blank">
    <img alt="NestJS" src="https://img.shields.io/badge/nestjs-v10.0.0-blue?logo=nestjs&logoColor=%23E0234E">
  </a>
  <a href="https://nestjs.com/" target="_blank">
    <img alt="NestJS/cli" src="https://img.shields.io/badge/nestjs%2Fcli-v10.3.1-blue?logo=nestjs&logoColor=%23E0234E">
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img alt="Docker" src="https://img.shields.io/badge/docker-v26.1.1-blue?logo=docker&logoColor=%232496ED">
  </a>
  <a href="https://www.mongodb.com/" target="_blank">
    <img alt="MongoDB" src="https://img.shields.io/badge/mongodb-v5.0.27-blue?logo=mongodb&logoColor=%2347A248">
  </a>

## Description

The [Budget](https://github.com/orojasm/budget-api) API RESTful application is based on NestJS, it is an open source application and MIT license.

Important implementation features:
* The Logger is implemented in [Pino](https://github.com/pinojs/pino) Logger and uses Correlation-Id. see in the [Nest documentation](https://docs.nestjs.com/techniques/logger)
* [Swagger](https://swagger.io/) is used to document the application.
* [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/). see in the [Nest documentation](https://docs.nestjs.com/techniques/mongodb)


## Pre-requirements

Budget API is based on `NestJS`. That's why it requires `NodeJS` and `Nest-CLI`.

We manage the sources with `Git`, the sources are found in the Github repository https://github.com/orojasm/budget-api.git

Data persistence is in charge of `MongoDB`, for the development environment we use Docker, therefore we must have `Docker Desktop` installed.

## Installation

```bash
# clone github repository
git clone https://github.com/orojasm/budget-api.git

# locate yourself in the application directory
cd budget-api

# install dependencies
npm install
```

## Execute the database

The development database is implemented in a docker container (see `docker-compose.yaml` file).
Data stored on a docker volume in the `mongo/` directory uses port 27027.

```bash
# start mongoDB docker container
docker-compose up -d
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Oscar Rojas](https://github.com/orojasm/)
- Website - [https://nestjs.com](https://orojas.dev/)

## License

BudgetAPI is [MIT licensed](LICENSE).
