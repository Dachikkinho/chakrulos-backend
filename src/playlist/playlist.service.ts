import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlayListRepository } from './playlist.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PlaylistService {

  constructor( private readonly playListRepository: PlayListRepository, private readonly jwtService: JwtService){}

  async create(createPlaylistDto: CreatePlaylistDto, request) {
    const authHeader = request.headers['authorization'];
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) throw new UnauthorizedException();

    let data: any;
    try {
      data = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const isUserAuthorized = data.role === 'admin' || data.id === createPlaylistDto.userId;

    if (!isUserAuthorized) throw new UnauthorizedException()

    return await this.playListRepository.create(createPlaylistDto)
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

  async removeMusicFromPlaylist(playlistId: number, musicId: number) {
    return this.playListRepository.removeMusicFromPlaylist(playlistId, musicId);
  }
}
