import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepo: AlbumsRepository) {}

  async create(createAlbumDto: CreateAlbumDto, url: string) {
    return await this.albumRepo.create(createAlbumDto, url);
  }

  async findAll() {
    return await this.albumRepo.findAll();
  }

  async findOne(id: number) {
    return await this.albumRepo.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepo.update(id, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumRepo.remove(id);
  }
}
