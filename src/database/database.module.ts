import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.database.host,
          port: parseInt(configService.database.port),
          username: configService.database.username,
          password: configService.database.password,
          database: configService.database.name,
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false,
          }
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
