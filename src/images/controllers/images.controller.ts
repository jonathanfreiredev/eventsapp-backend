import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('No file provided');
    }

    const result = await this.imagesService.uploadImage(image);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }
}
