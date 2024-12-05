import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from '../services/images.service';
import { BadRequestException } from '@nestjs/common';

describe('ImagesController', () => {
  let controller: ImagesController;
  let imagesService: ImagesService;

  const mockImagesService = {
    uploadImage: jest.fn(),
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'image',
    originalname: 'test-image.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: Buffer.from('test-image-content'),
    size: 1024,
    destination: '',
    filename: '',
    path: '',
    stream: null,
  };

  const mockResponse = {
    secure_url: 'http://cloudinary.com/test-image.jpg',
    public_id: 'test-image-id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        { provide: ImagesService, useValue: mockImagesService },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should throw BadRequestException if no file is provided', async () => {
      await expect(controller.uploadImage(undefined as any)).rejects.toThrow(BadRequestException);
    });

    it('should call imagesService.uploadImage with the correct file', async () => {
      mockImagesService.uploadImage.mockResolvedValue(mockResponse);

      const result = await controller.uploadImage(mockFile);

      expect(imagesService.uploadImage).toHaveBeenCalledWith(mockFile);
      expect(result).toEqual({
        url: mockResponse.secure_url,
        publicId: mockResponse.public_id,
      });
    });
  });
});