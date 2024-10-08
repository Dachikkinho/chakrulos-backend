import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findUserByEmail(email: string) {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();
  }

  async findAll() {
    return await this.usersRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.email',
        'users.createdAt',
        'users.updatedAt',
        'users.delatedAt',
        'users.blocked',
      ])
      .getMany();
  }

  async findOne(id: number) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.favorites', 'favorites')
      .leftJoinAndSelect('favorites.music', 'm')
      .leftJoinAndSelect('m.author', 'a')
      .leftJoinAndSelect('users.playlists', 'playlist')
      .leftJoinAndSelect('playlist.musics', 'ms')
      .where('users.id = :id', { id })
      .getOne();
  }

  async create(data: CreateUserDto) {
    let user = this.usersRepository.create(data);
    user.password = await Bcrypt.hash(user.password, 12);

    try {
      return this.usersRepository.save(user);
    } catch (err) {
      throw new BadRequestException('this email already used');
    }
  }

  async update(id: number, data: UpdateUserDto) {
    let user = await this.usersRepository.create(data);
    if (data.password) {
      user.password = await Bcrypt.hash(data.password, 12);
    }

    try {
      return await this.usersRepository.update(id, user);
    } catch (err) {
      throw new BadRequestException('this email already used');
    }
  }

  async remove(id: number) {
    await this.usersRepository.softDelete(id);

    return this.usersRepository
      .createQueryBuilder('users')
      .withDeleted()
      .where('users.id = :id', { id })
      .getOne();
  }

  async block(id: number) {
    const user = this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('USER NOT FOUND');
    }

    (await user).blocked = !(await user).blocked;

    return await this.usersRepository.update(id, await user);
  }
}
