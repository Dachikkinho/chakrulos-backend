import { Module } from '@nestjs/common';
import { MusicServices } from './musics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { MusicRepositories } from './musics.repository';
import { MusicControllers } from './musics.controller';
import { S3serviceService } from 'src/s3service/s3service.service';
import { S3serviceRepositroy } from 'src/s3service/s3service.repository';
import { S3service } from 'src/s3service/entities/s3service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity, S3service])],
  controllers: [MusicControllers],
  providers: [
    MusicServices,
    MusicRepositories,
    S3serviceService,
    S3serviceRepositroy,
  ],
})
export class MusicModule {}
