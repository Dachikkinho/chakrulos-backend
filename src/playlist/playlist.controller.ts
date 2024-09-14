import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { RoleEnum } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/decorators/public.decorator';
import { Request } from 'express';

@Roles(RoleEnum.user, RoleEnum.admin)
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('/user')
  findOneUsersAllPlayList(@Query('id') id: string) {
    return this.playlistService.findOneUsersAllPlayList(+id);
  }

  @Post()
  create(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @Req() request: Request,
  ) {
    return this.playlistService.create(createPlaylistDto, request);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }

  @Delete(':playlistId/music/:musicId')
  async removeMusic(
    @Param('playlistId') playlistId: number,
    @Param('musicId') musicId: number,
  ) {
    return this.playlistService.removeMusicFromPlaylist(playlistId, musicId);
  }
}
