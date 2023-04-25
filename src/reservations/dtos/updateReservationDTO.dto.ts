import { IsString } from "class-validator";

export class updateReservationDTO {
  reservationDate: Date;
  dueDate: Date;
  returnDate: Date = null;
  @IsString()
  reservationStatus: string;
  userId: number;
  bookStockId: number;
}