import { Injectable } from '@nestjs/common';
import { MusicRepositories } from 'src/music/musics.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { AthorRepository } from 'src/authors/authors.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicRepositories,

    private readonly albumRepository: AlbumsRepository,

    private readonly authorReposytory: AthorRepository
  ){}

  async search(search: string) {
    let music = await this.musicRepository.search(search)
    let album = await this.albumRepository.search(search)
    let author = await this.authorReposytory.search(search)
    
    
    return {
      music,
      album,
      author
    }
  }

}
