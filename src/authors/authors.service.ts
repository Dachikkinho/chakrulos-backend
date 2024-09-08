import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AthorRepository } from './authors.repository';
import * as s3Service from '../s3service/file-validation/aws-s3';

@Injectable()
export class AuthorsService {
  constructor(private readonly AutorRepository: AthorRepository) {}

  async create(createAuthorDto: CreateAuthorDto, url: string) {
    return await this.AutorRepository.create(createAuthorDto, url);
  }

  async findAll() {
    return await this.AutorRepository.findAll();
  }

  async findWithCategory(category: string) {
    return await this.AutorRepository.findWithCategory(category);
  }

  async findOne(id: number) {
    return await this.AutorRepository.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.AutorRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    return await this.AutorRepository.remove(id);
  }
}
