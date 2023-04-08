import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { createReservationDTO } from '../dtos/createReservationDTO';
import { dtoToEntity } from '../mapper/reservation.mapper';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(BookStock) private bookStockRepository: Repository<BookStock>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
        @InjectRepository(Audit) private loggerRepo: Repository<Audit>
    ){}

    fetchReservations(){
        return this.reservationRepository.find();
    }
    async createReservation(reservationDetails: createReservationDTO){
        const user = await this.userRepository.findOneById(reservationDetails.userId);
        const bookStock = await this.bookStockRepository.findOneById(reservationDetails.bookStockId)
        let newReservation : Reservation = dtoToEntity(reservationDetails);
        newReservation.addBookStock(bookStock);
        newReservation.addUser(user);
        let newLog: Audit = entityToLog("New Reservation",newReservation,"Reservations")
    this.loggerRepo.save(newLog)
        return this.reservationRepository.save(newReservation);
    }
}
