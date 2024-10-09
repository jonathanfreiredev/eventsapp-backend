# BUILD
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
ENV NODE_ENV development

RUN ["pnpm", "build"]

EXPOSE 4000

CMD ["sh", "-c", "pnpm migrations:run && pnpm start:dev"]