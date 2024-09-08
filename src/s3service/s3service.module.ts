import { Module } from '@nestjs/common';
import { S3serviceService } from './s3service.service';
import { S3serviceRepositroy } from './s3service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3service } from './entities/s3service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([S3service])],
  providers: [S3serviceService, S3serviceRepositroy],
})
export class S3serviceModule {}
