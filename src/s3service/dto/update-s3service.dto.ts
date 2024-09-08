import { PartialType } from '@nestjs/mapped-types';
import { CreateS3serviceDto } from './create-s3service.dto';

export class UpdateS3serviceDto extends PartialType(CreateS3serviceDto) {}
