import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-musics.dto';
import { UpdateMusicDto } from './dto/update-musics.dto';

@Injectable()
export class MusicRepositories {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicsRepository: Repository<MusicEntity>,
  ) {}

  async findAll() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoin('music.author', 'a')
      .select([
        'a.firstName',
        'a.lastName',
        'music.name',
        'music.url',
        'music.authorId',
        'music.id',
        'music.image',
      ])
      .getMany();
  }

  findOne(id: number) {
    return this.musicsRepository
      .createQueryBuilder('music')
      .leftJoin('music.author', 'a')
      .where('music.id = :id', { id })
      .select([
        'a.firstName',
        'a.lastName',
        'music.name',
        'music.url',
        'music.authorId',
        'music.id',
        'music.image',
      ])
      .getOne();
  }

  async create(data: CreateMusicDto, fileUrl: string, imageUrl: string) {
    const music = new MusicEntity();
    music.name = data.name;
    music.authorId = data.authorId;
    music.url = fileUrl;
    music.image = imageUrl;
    music.albumId = data.albumId;
    return this.musicsRepository.save(music);
  }

  async update(id: number, data: UpdateMusicDto) {
    await this.musicsRepository.update(id, data);

    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    await this.musicsRepository.softDelete(id);

    return await this.musicsRepository
      .createQueryBuilder('music')
      .withDeleted()
      .where('music.id = :id', { id })
      .getOne();
  }

  async search(search: string) {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.name LIKE :search', { search: `${search}%` })
      .leftJoin('music.author', 'a')
      .select([
        'a.firstName',
        'a.lastName',
        'music.name',
        'music.url',
        'music.authorId',
        'music.id',
        'music.image',
      ])
      .getMany();
  }
}
