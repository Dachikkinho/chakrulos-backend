import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoritesRepository } from './favorites.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports:[FavoritesRepository]
})
export class FavoritesModule {}
