import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {

  constructor(private readonly favoriteRepository: FavoritesRepository){}
  async create(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.create(createFavoriteDto)
  }

  async findAll() {
    return await this.favoriteRepository.findAll()
  }

  async findOne(id: number) {
    return await this.favoriteRepository.findOneUserAllFavorite(id)
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return await this.favoriteRepository.update(id, updateFavoriteDto)
  }

  async remove(id: number) {
    return await this.favoriteRepository.remove(id)
  }
}
