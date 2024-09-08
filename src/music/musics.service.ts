import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-musics.dto';
import { UpdateMusicDto } from './dto/update-musics.dto';
import { MusicRepositories } from './musics.repository';
import * as s3Service from '../s3service/file-validation/aws-s3';

@Injectable()
export class MusicServices {
  constructor(private readonly musicRepository: MusicRepositories) {}

  create(createMusicDto: CreateMusicDto, fileUrl: string, imageUrl: string) {
    return this.musicRepository.create(createMusicDto, fileUrl, imageUrl);
  }

  findAll() {
    return this.musicRepository.findAll();
  }

  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(id, updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
