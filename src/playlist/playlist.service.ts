import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlayListRepository } from './playlist.repository';

@Injectable()
export class PlaylistService {

  constructor( private readonly playListRepository: PlayListRepository){}

  async create(createPlaylistDto: CreatePlaylistDto) {
    return await this.playListRepository.create(createPlaylistDto);
  }

  async findAll() {
    return await this.playListRepository.findAll();
  }

  async findOne(id: number) {
    return await this.playListRepository.findOne(id)
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playListRepository.update(id,updatePlaylistDto)
  }

  async remove(id: number) {
    return await this.playListRepository.remove(id)
  }

  async findOneUsersAllPlayList(id: number){
    return await this.playListRepository.findOneUsersAllPlayList(id)
  }
}
