import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository } from './favorites.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FavoritesService {

  constructor(private readonly favoriteRepository: FavoritesRepository, private readonly jwtService: JwtService){}
  async create(createFavoriteDto: CreateFavoriteDto, request) {
    const authHeader = request.headers['authorization'];
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) throw new UnauthorizedException();

    let data: any;
    try {
      data = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const isUserAuthorized = data.role === 'admin' || data.id === createFavoriteDto.userId;

    if (!isUserAuthorized) throw new UnauthorizedException()
      
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
