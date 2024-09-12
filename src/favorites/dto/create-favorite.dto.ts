import { IsNumber } from "class-validator";

export class CreateFavoriteDto {
    @IsNumber()
    userId: number

    @IsNumber()
    musicId: number
}
