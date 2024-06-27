# NodeJS 20 on Linux Alpine 3.19

FROM node:current-alpine3.19 AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:current-alpine3.19 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:current-alpine3.19 AS runner
# Set working directory
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=builder /app/dist ./dist
# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000
CMD [ "node","dist/main" ]