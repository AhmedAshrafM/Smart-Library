import { IsNumber, isNumber, IsString, Min } from "class-validator";

export class createBookStockDto {
    @IsNumber()
    bookStock: number;
    @IsString()
    shelf: string;
    distributorId: number;
    bookId: number;
}