import { Module } from '@nestjs/common';
import { ImagesService } from './services/images.service';
import { ImagesController } from './controllers/images.controller';
import { ImagesProvider } from './providers/images.provider';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ImagesProvider],
})
export class ImagesModule {}
