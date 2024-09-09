import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { PlayListRepository } from 'src/playlist/playlist.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly playlistRepository: PlayListRepository,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }

  async me(id: number) {
    let user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }
    let playlist = await this.playlistRepository.findOneUsersAllPlayList(id);

    return {
      user,
      playlist,
    };

    // for later use
    //   try {
    //     let cookie = request.cookies['jwt'];

    //     let data = await this.jwtService.verifyAsync(cookie);

    //     if (!data) {
    //       throw new UnauthorizedException();
    //     }

    //     let user = await this.usersRepository.findOne(data.id);
    //     let favorite = await this.favoritesRepository.findOneUserAllFavorite(
    //       data.id,
    //     );
    //     let playlist = await this.playlistRepository.findOneUsersAllPlayList(
    //       data.id,
    //     );

    //     return {
    //       user,
    //       favorite,
    //       playlist,
    //     };
    //   } catch (err) {
    //     console.log('try');

    //     throw new UnauthorizedException();
    //   }
    // }
  }
}
