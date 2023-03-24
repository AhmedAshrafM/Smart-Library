import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>
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
        return this.reservationRepository.save(newReservation);
    }
}
