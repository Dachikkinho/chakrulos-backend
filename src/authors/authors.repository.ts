import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async findAll() {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .leftJoinAndSelect('author.album', 'a')
      .getMany();
  }

  async findOne(id: number) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .leftJoinAndSelect('author.album', 'a')
      .leftJoin('m.author', 'auth')
      .select([
        'auth.firstName',
        'auth.lastName',
        'm.name',
        'm.url',
        'm.authorId',
        'm.id',
        'm.image',
        'author',
        'a'
      ])
      .where('author.id = :id', { id })
      .getOne();
  }

  async findWithCategory(category: string) {
    const categoryHits = ['Hits', 'Charts', 'Artists'];
    const categoryRegions = ['Popular', 'Georgian', 'European'];
    let categ = '';

    if (categoryHits.includes(category)) categ = 'Category';
    else if (categoryRegions.includes(category)) categ = 'Region';
    else categ = 'endpoint does not exist';

    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .leftJoinAndSelect('author.album', 'a')
      .where(`author.${categ} = :category`, { category })
      .getMany();
  }

  async create(data: CreateAuthorDto, url: string) {
    const author = new AuthorEntity();
    author.biography = data.biography;
    author.Region = data.Region;
    author.Category = data.Category;
    author.firstName = data.firstName;
    author.lastName = data.lastName;

    author.image = url;

    return await this.authorRepository.save(author);
  }

  async update(id: number, data: UpdateAuthorDto) {
    await this.authorRepository.update(id, data);

    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    await this.authorRepository.softDelete(id);

    return await this.authorRepository
      .createQueryBuilder('author')
      .withDeleted()
      .where('author.id = :id', { id })
      .getOne();
  }
  async search(search: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .where('author.firstName OR author.firstName LIKE :search', {
        search: `${search}%`,
      })
      .getMany();
  }
}
