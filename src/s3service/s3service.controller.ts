import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { S3serviceService } from './s3service.service';
import { CreateS3serviceDto } from './dto/create-s3service.dto';
import { UpdateS3serviceDto } from './dto/update-s3service.dto';

@Controller('s3service')
export class S3serviceController {
  constructor(private readonly s3serviceService: S3serviceService) {}

}
