import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlbumDto {
    
    @IsString()
    name: string;

    @IsString()
    artistName: string;

    @IsString()
    releaseDate: string;

    @IsNumber()
    authorId: number;

    @IsNumber()
    @IsOptional()
    userId?: number;
}
