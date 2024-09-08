import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  biography: string;

  @IsString()
  Category: 'Charts' | 'Hits' | 'Artists'

  @IsString()
  Region: "Popular" | "Georgian" | "European";

  @IsNumber()
  userId: number;
}
