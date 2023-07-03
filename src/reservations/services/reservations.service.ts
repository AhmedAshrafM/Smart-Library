import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { ReservationFilters } from '../dtos/resultDTO.dto';   
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

  async fetchReservations(filters?: ReservationFilters) {
    const queryBuilder = this.reservationRepository.createQueryBuilder('reservation');
    queryBuilder.leftJoinAndSelect('reservation.userId', 'user');
    queryBuilder.leftJoinAndSelect('reservation.bookStockId', 'bookStock');
  
    if (filters) {
      if (filters.userId) {
        queryBuilder.andWhere('reservation.userId = :userId', { userId: filters.userId });
      }
  
      if (filters.reservationStatus) {
        queryBuilder.andWhere('reservation.reservationStatus = :status', { status: filters.reservationStatus });
      }
  
      if (filters.dueDate) {
        const dueDate = new Date(filters.dueDate);
        const nextDay = new Date(dueDate.getTime() + 86400000); 
        queryBuilder.andWhere('reservation.dueDate >= :startDate', { startDate: dueDate });
        queryBuilder.andWhere('reservation.dueDate < :endDate', { endDate: nextDay });
      }
  
      if (filters.returnDate) {
        const returnDate = new Date(filters.returnDate);
        const nextDay = new Date(returnDate.getTime() + 86400000); 
        queryBuilder.andWhere('reservation.returnDate >= :startDate', { startDate: returnDate });
        queryBuilder.andWhere('reservation.returnDate < :endDate', { endDate: nextDay });
      }
  
      if (filters.reservationDate) {
        const reservationDate = new Date(filters.reservationDate);
        const nextDay = new Date(reservationDate.getTime() + 86400000); 
        queryBuilder.andWhere('reservation.reservationDate >= :startDate', { startDate: reservationDate });
        queryBuilder.andWhere('reservation.reservationDate < :endDate', { endDate: nextDay });
      }
  
      if (filters.bookStockId) {
        queryBuilder.andWhere('reservation.bookStockId = :bookStockId', { bookStockId: filters.bookStockId });
      }
    }
  
    return queryBuilder.getMany();
  }
  
  

  async createReservation(reservationDetails: createReservationDTO) {
    const user = await this.userRepository.findOneById(
      reservationDetails.userId,
    );
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const bookStock = await this.bookStockRepository
      .createQueryBuilder('book_stock')
      .select('book_stock.id')
      .leftJoin(
        Reservation,
        'reservation',
        'book_stock.id = reservation.bookStockId',
      )
      .where(
        "book_stock.bookId = :bookId AND (reservation.reservationStatus IS NULL OR reservation.reservationStatus != 'Active')",
        { bookId: reservationDetails.bookStockId },
      )
      .andWhere(
        "reservation.id NOT IN (SELECT reservation.id FROM reservation r WHERE r.bookStockId = book_stock.id AND r.reservationStatus = 'Active' )",
      )
      .getOne();
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
    if (!user || !bookStock) {
      throw new NotFoundException('User or book stock not found');
    }
    let updatedReservation: Reservation = dtoToEntity(updateReservationDetails);
    updatedReservation.addBookStock(bookStock);
    updatedReservation.addUser(user);

    return await this.reservationRepository.update(id, {
      ...updatedReservation,
    });
  }

  async deleteReservation(id: number) {
    const reservation = await this.reservationRepository.findOneById(id);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return await this.reservationRepository.delete(id);
  }

  async getReservationById(id: number) {
    return await this.reservationRepository.find({
      where: { id: id },
      relations: ['userId', 'bookStockId','bookStockId.book'],
    });
  }

  async getReservationByUserId(id: number) {
    return await this.reservationRepository.find({
      where: { userId: { id } },
      relations: ['bookStockId','bookStockId.book'],
      join: {
        alias: 'reservation',
        innerJoin: {
          bookStockId: 'reservation.bookStockId',
          book: 'bookStockId.book',
        },
      },
    });
  }

  async getOverDueBooks() {
    return await this.reservationRepository
      .createQueryBuilder()
      .select()
      .where('dueDate < current_date()' && 'reservationStatus = :status', {status: 'Active'})
      .getMany();
  }

  async getMostBorrowedGenres() {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('genre.genreName, COUNT(*) as Count')
      .innerJoin('reservation.bookStockId', 'bookStock')
      .innerJoin('bookStock.book', 'book')
      .innerJoin('book.genres', 'genre')
      .groupBy('genre.genreName')
      .getRawMany();
  }
  async getMostBorrowedBooks() {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('book.bookTitle, COUNT(*) as Count')
      .innerJoin('reservation.bookStockId', 'bookStock')
      .innerJoin('bookStock.book', 'book')
      .groupBy('book.bookTitle')
      .getRawMany();
  }
}
