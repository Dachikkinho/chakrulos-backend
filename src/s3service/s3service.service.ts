import { Injectable } from '@nestjs/common';
import { CreateS3serviceDto } from './dto/create-s3service.dto';
import { UpdateS3serviceDto } from './dto/update-s3service.dto';
import * as s3Service from './file-validation/aws-s3';
import { S3serviceRepositroy } from './s3service.repository';

@Injectable()
export class S3serviceService {
  constructor(private readonly s3ServiceRepository: S3serviceRepositroy) {}

  private readonly s3Client = new s3Service.AWSS3Service(
    process.env.REGION_CODE,
    process.env.ACCESS_KEY,
    process.env.SECRET_KEY,
  );
  async upload(userId: number, file: Express.Multer.File, destination: string) {
    this.s3Client.uploadObject(
      `${destination}/${file.originalname}`,
      file.buffer,
      file.mimetype,
    );
    const url = `https://chakrulos.s3.eu-central-1.amazonaws.com/${destination}/${file.originalname}`;
    await this.s3ServiceRepository.upload(userId, url);
    return url;
  }

  async delete(url: string) {
    const name = url.split('amazonaws.com/')[1]
    this.s3Client.deleteObject(name)
  }
}
