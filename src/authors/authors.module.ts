import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorEntity } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthorRepository } from './authors.repository';
import { S3service } from 'src/s3service/entities/s3service.entity';
import { S3serviceService } from 'src/s3service/s3service.service';
import { S3serviceRepositroy } from 'src/s3service/s3service.repository';


@Module({
  imports:[TypeOrmModule.forFeature([AuthorEntity, S3service])],
  controllers: [AuthorsController],
  providers: [AuthorsService,AthorRepository, S3serviceService, S3serviceRepositroy],
})
export class AuthorsModule {}
