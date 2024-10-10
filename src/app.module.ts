import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AddressesModule } from './addresses/addresses.module';
import { CommentsModule } from './comments/comments.module';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        DATABASE_URL: Joi.string().min(3).required(),
        DATABASE_HOST: Joi.string().min(3).required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_NAME: Joi.string().min(3).required(),
        DATABASE_USERNAME: Joi.string().min(3).required(),
        DATABASE_PASSWORD: Joi.string().min(3).required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    EventsModule,
    CommentsModule,
    AddressesModule,
  ],
})
export class AppModule {}
