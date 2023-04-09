import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { eventToNotification } from 'src/notifications/notifications.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Notification } from 'src/typeorm/entities/Notification';
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
        @InjectRepository(Audit) private loggerRepo: Repository<Audit>,
        @InjectRepository(Notification) private notRepo: Repository<Notification>
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
        let newNotifcation : Notification = eventToNotification(newReservation,newReservation.id,"New Reservation")
        let newLog: Audit = entityToLog("New Reservation",newReservation,"Reservations")
        this.loggerRepo.save(newLog)
        this.notRepo.save(newNotifcation)
        return this.reservationRepository.save(newReservation);
    }
}
