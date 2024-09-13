import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAuthorDto } from './dto/update-author.dto';
import multer, { diskStorage } from 'multer';
import * as s3Service from '../s3service/file-validation/aws-s3';
import { validateFile } from 'src/s3service/file-validation/file-validation.utils';
import { getFileName } from 'src/s3service/file-validation/file-name.utils';
import { S3serviceService } from 'src/s3service/s3service.service';
import { Roles } from 'src/auth/decorators/public.decorator';
import { RoleEnum } from 'src/auth/roles/roles.enum';

@Roles(RoleEnum.admin)
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly s3service: S3serviceService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: validateFile,
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: '.(jpeg|jpg|png)' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    image.originalname = getFileName(image);
    const url = await this.s3service.upload(
      createAuthorDto.userId,
      image,
      'authorImgs',
    );
    return this.authorsService.create(createAuthorDto, url);
  }

  @Get('category/:category')
  @Roles(RoleEnum.user, RoleEnum.admin)
  findWithCategory(@Param('category') category: string) {
    return this.authorsService.findWithCategory(category);
  }

  @Get()
  @Roles(RoleEnum.user, RoleEnum.admin)
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.user, RoleEnum.admin)
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Patch('view/:id')
  @Roles(RoleEnum.user, RoleEnum.admin)
  increaseViews(@Param('id') id: string) {
    return this.authorsService.increaseViews(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const image = (await this.authorsService.findOne(+id)).image;
    await this.s3service.delete(image);
    return this.authorsService.remove(+id);
  }
}
