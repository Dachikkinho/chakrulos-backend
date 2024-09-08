import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicDto } from './create-musics.dto';

export class UpdateMusicDto extends PartialType(CreateMusicDto) {}
