import { isDate, IsString } from "class-validator";

export class createReservationDTO {
  reservationDate: Date;
  dueDate: Date;
  returnDate: Date = null;
  @IsString()
  reservationStatus: string;
  userId: number;
  bookStockId: number;
}