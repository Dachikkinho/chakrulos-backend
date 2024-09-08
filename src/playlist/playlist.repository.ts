import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlaylistEntity } from "./entities/playlist.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { MusicEntity } from "src/music/entities/music.entity";


@Injectable()
export class PlayListRepository {

    constructor(
        @InjectRepository(PlaylistEntity)
        private readonly playlistRepository: Repository<PlaylistEntity>,
      ) {}

      attach(musicIds: number[]): MusicEntity[]{
        let arr = [] 
        for(let i = 0;i < musicIds.length;i++){
          let music = new MusicEntity()
          music.id = musicIds[i]
          arr.push(music)
        }
        return arr
      }

      async findOneUsersAllPlayList(id: number){
        return await this.playlistRepository
        .createQueryBuilder('playList')
        .leftJoin('playList.user','user')
        .leftJoinAndSelect('playList.musics','musics')
        .where('user.id = :id',{id})
        .getMany()
      }
    
      async findAll(){
        return await this.playlistRepository
        .createQueryBuilder('playList')
        .leftJoinAndSelect('playList.musics','musics')
        .getMany()
      }
    
      async findOne(id: number) {
        return await this.playlistRepository
        .createQueryBuilder('playList')
        .leftJoinAndSelect('playList.musics','musics')
        .where('playList.id = :id',{id})
        .getOne()
      }
    
      async create(data: CreatePlaylistDto) {
        let playlist = this.playlistRepository.create(data)

        return this.playlistRepository.save(playlist)
        
      }
    
      async update(id: number, data: UpdatePlaylistDto) {
        let {musicIds,...Column} = data

        let playList = new PlaylistEntity()
        playList.id = id
        Object.assign(playList,Column)
        let playLisserch = await this.findOne(id)

        let musicsids = []
        for(let i = 0; i < playLisserch.musics.length ;i++){
          musicsids.push(playLisserch.musics[i].id)
        }

        
        if(musicIds){
          playList.musics = await this.attach([...musicIds,...musicsids])
        }
        
        return this.playlistRepository.save(playList)
        
      }
    
      async remove(id: number) {
        await this.playlistRepository.softDelete(id)
    
        return this.playlistRepository
        .createQueryBuilder('playList')
        .withDeleted()
        .where('playList.id = :id',{id})
        .getOne()
      }
}