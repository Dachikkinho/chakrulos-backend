import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FavoriteEntity } from "./entities/favorite.entity"
import { Repository } from "typeorm"
import { CreateFavoriteDto } from "./dto/create-favorite.dto"
import { UpdateFavoriteDto } from "./dto/update-favorite.dto"

@Injectable()
export class FavoritesRepository {

    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly favoriteRepository: Repository<FavoriteEntity>,
      ) {}

      async findAll(){
        return await this.favoriteRepository
        .createQueryBuilder('favorite')
        .leftJoinAndSelect('favorite.music','music')
        .getMany()
      }
    
      async findOneUserAllFavorite(id: number) {
        return await this.favoriteRepository
        .createQueryBuilder('favorite')
        .leftJoinAndSelect('favorite.music','music')
        .leftJoin('favorite.user','user')
        .where('user.id = :id',{id})
        .getMany()
      }
    
      async create(data: CreateFavoriteDto) {
        let favorite = this.favoriteRepository.create(data)

        let music = await this.favoriteRepository
        .createQueryBuilder('favorite')
        .where('favorite.musicId = :musicId', { musicId: data.musicId })
        .andWhere('favorite.userId = :userId', { userId: data.userId })
        .getOne()

        if(!music){
          return await this.favoriteRepository.save(favorite)
        }else{
          throw new BadRequestException('this music alwredy used');
        }

        
      }
    
      async update(id: number, data: UpdateFavoriteDto) {
        
        return await this.favoriteRepository.update(id, data)
      }
    
      async remove(id: number) {
        await this.favoriteRepository.softDelete(id)
    
        return await this.favoriteRepository
        .createQueryBuilder('favorite')
        .withDeleted()
        .where('favorite.id = :id',{id})
        .getOne()
      }
}