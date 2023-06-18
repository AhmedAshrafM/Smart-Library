import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { eventToNotification } from 'src/notifications/notifications.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { Book } from 'src/typeorm/entities/Book';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Notification } from 'src/typeorm/entities/Notification';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { createReservationDTO } from '../dtos/createReservationDTO';
import { updateReservationDTO } from '../dtos/updateReservationDTO.dto';
import { dtoToEntity } from '../mapper/reservation.mapper';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(BookStock)
    private bookStockRepository: Repository<BookStock>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>,
    @InjectRepository(Notification) private notRepo: Repository<Notification>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  fetchReservations() {
    return this.reservationRepository.find({
      relations: ['userId', 'bookStockId'],
    });
  }
  async createReservation(reservationDetails: createReservationDTO) {
    const user = await this.userRepository.findOneById(
      reservationDetails.userId,
    );
    const bookStock = await this.bookStockRepository
      .createQueryBuilder('book_stock')
      .select("book_stock.id")
      .leftJoin(
        Reservation,
        'reservation',
        'book_stock.id = reservation.bookStockId',
      )
      .where(
        "book_stock.bookId = :bookId AND (reservation.reservationStatus IS NULL OR reservation.reservationStatus != 'Active')",
        { bookId: reservationDetails.bookStockId },
      ).getOne();
    if (!bookStock) {
      throw new ConflictException('Book is not available for reservation.');
    }
    let newReservation: Reservation = dtoToEntity(reservationDetails);
    newReservation.addBookStock(bookStock);
    newReservation.addUser(user);
    let newNotifcation: Notification = eventToNotification(
      newReservation,
      newReservation.id,
      'New Reservation',
    );
    let newLog: Audit = entityToLog(
      'New Reservation',
      newReservation,
      'Reservations',
    );
    this.loggerRepo.save(newLog);
    this.notRepo.save(newNotifcation);
    console.log(newReservation);

    return this.reservationRepository.save(newReservation);
  }
  async updateReservation(
    id: number,
    updateReservationDetails: updateReservationDTO,
  ) {
    const user = await this.userRepository.findOneById(
      updateReservationDetails.userId,
    );
    const bookStock = await this.bookStockRepository.findOneById(
      updateReservationDetails.bookStockId,
    );
    let updatedReservation: Reservation = dtoToEntity(updateReservationDetails);
    updatedReservation.addBookStock(bookStock);
    updatedReservation.addUser(user);

    return await this.reservationRepository.update(id, {
      ...updatedReservation,
    });
  }
  async deleteReservation(id: number) {
    return this.reservationRepository.delete(id);
  }
  async getReservationById(id: number) {
    return await this.reservationRepository.find({where:{id: id},relations:['userId', 'bookStockId']});
  }
  async getReservationByUserId(id: number){
    return await this.reservationRepository.createQueryBuilder().select().where(
      "userId = :id" ,{id:id}
    ).getMany()
  }
  async getOverDueBooks(){
    return await this.reservationRepository.createQueryBuilder().select().where(
      "dueDate < current_date()"
    ).getMany()
  }
  async getMostBorrowedGenres() {
    return await this.reservationRepository
    .createQueryBuilder('reservation')
    .select('genre.genreName, COUNT(*) as Count')
    .innerJoin('reservation.bookStockId', 'bookStock')
    .innerJoin('bookStock.book', 'book')
    .innerJoin('book.genres', 'genre')
    .groupBy('genre.genreName')
    .getRawMany()
  }
}
