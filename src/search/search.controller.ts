import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Roles } from 'src/auth/decorators/public.decorator';
import { RoleEnum } from 'src/auth/roles/roles.enum';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':search')
  search(@Param('search') search: string) {
    return this.searchService.search(search);
  }
}
