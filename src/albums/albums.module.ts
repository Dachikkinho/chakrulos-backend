import { Module } from '@nestjs/common';
import { AlbumService } from './albums.service';
import { AlbumController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { MusicServices } from 'src/music/musics.service';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicRepositories } from 'src/music/musics.repository';
import { S3service } from 'src/s3service/entities/s3service.entity';
import { S3serviceService } from 'src/s3service/s3service.service';
import { S3serviceRepositroy } from 'src/s3service/s3service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, MusicEntity, S3service])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsRepository, MusicServices, MusicRepositories, S3serviceService, S3serviceRepositroy],
})
export class AlbumModule {}
