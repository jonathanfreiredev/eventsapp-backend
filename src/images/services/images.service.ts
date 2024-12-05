import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class ImagesService {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'uploads' },
            (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if (error) {
                console.log(error);
                return reject(new BadRequestException('Error al subir la imagen'));
              }
              resolve(result);
            },
          ).end(file.buffer);
        });
      }
}
