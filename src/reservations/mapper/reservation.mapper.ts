import { Reservation } from "src/typeorm/entities/Reservation";
import { createReservationDTO } from "../dtos/createReservationDTO";

export const dtoToEntity = (creationDto: createReservationDTO): Reservation => {
    let reservation: Reservation = new Reservation();
    reservation.dueDate = creationDto.dueDate
    reservation.reservationDate = creationDto.reservationDate
    reservation.reservationStatus = creationDto.reservationStatus
    reservation.returnDate = creationDto.returnDate
    return reservation;
  };
