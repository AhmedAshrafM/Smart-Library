import { IsOptional } from "class-validator";

export class ReservationFilters {
    @IsOptional()
    userId?: number;
    @IsOptional()
    reservationStatus?: string;
    @IsOptional()
    dueDate?: Date;
    @IsOptional()
    returnDate?: Date;
    @IsOptional()
    reservationDate?: Date;
    @IsOptional()
    bookStockId?: number;
    @IsOptional()
    bookTitle?: string;
    @IsOptional()
    genreName?: string;
    @IsOptional()
    distributorName?: string;
  }