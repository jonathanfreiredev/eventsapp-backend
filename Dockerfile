# BUILD
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
ENV NODE_ENV development

RUN ["npm", "run", "build"]

EXPOSE 4000

CMD ["sh", "-c", "npm run migrations:run && npm run seed && npm run start:dev"]