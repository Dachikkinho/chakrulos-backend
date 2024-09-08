import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3service } from './entities/s3service.entity';
import { Repository } from 'typeorm';
import { CreateS3serviceDto } from './dto/create-s3service.dto';

@Injectable()
export class S3serviceRepositroy {
  constructor(
    @InjectRepository(S3service)
    private readonly s3ServiceRepo: Repository<S3service>,
  ) {}

  async upload(userId: number, file: string) {
    const newUpload = new S3service();

    newUpload.userId = userId;
    newUpload.uploadedFile = file;

    return await this.s3ServiceRepo.save(newUpload);
  }

  async delete() {
    
  }
}
