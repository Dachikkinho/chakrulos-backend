import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MusicRepositories } from 'src/music/musics.repository';
import { MusicModule } from 'src/music/musics.module';
import { MusicEntity } from 'src/music/entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { AthorRepository } from 'src/authors/authors.repository';

@Module({
  imports:[TypeOrmModule.forFeature([MusicEntity,AlbumEntity,AuthorEntity])],
  controllers: [SearchController],
  providers: [SearchService,MusicRepositories,AlbumsRepository,AthorRepository],
})
export class SearchModule {}
