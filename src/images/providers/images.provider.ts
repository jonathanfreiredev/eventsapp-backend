import { v2 as cloudinary } from 'cloudinary';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class ImagesProvider {
  constructor(@Inject(config.KEY) private configService: ConfigType<typeof config>,) {
    cloudinary.config({
      cloud_name: this.configService.cloudinary.cloudName,
      api_key: this.configService.cloudinary.apiKey,
      api_secret: this.configService.cloudinary.apiSecret,
    });
  }

  getClient() {
    return cloudinary;
  }
}
