import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createBookDto } from 'src/books/dtos/createBook.dto';
import { dtoToEntity } from 'src/books/mapper/book.mapper';
import { Author } from 'src/typeorm/entities/Author';
import { Book } from 'src/typeorm/entities/Book';
import { Genre } from 'src/typeorm/entities/Genre';
import { Audit } from 'src/typeorm/entities/Audit';
import { Publisher } from 'src/typeorm/entities/Publisher';
import { DataSource, Repository } from 'typeorm';
import { entityToLog } from '../mapper/logger.mapper';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { checkIfDataExists } from 'src/utils/checkIfDataExists.utils';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Publisher) private publishersRepository: Repository<Publisher>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Audit) private loggerRepository: Repository<Audit>,
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(BookStock) private bookStockRepo: Repository<BookStock>,
  ) {}

  fetchBooks() {
    return this.booksRepository.find();
  }

  async createBook(bookDetails: createBookDto) {
    const publishers = await this.publishersRepository.findByIds(bookDetails.publisherIds);
    const authors = await this.authorRepository.findByIds(bookDetails.authorIds);
    const genres = await this.genreRepository.findByIds(bookDetails.genreIds);

    if (!publishers.length || !authors.length || !genres.length) {
      throw new NotFoundException('Publishers, Authors, or Genres not found');
    }
    await checkIfDataExists(this.booksRepository, 'bookTitle', bookDetails.bookTitle);
    let newBook: Book = dtoToEntity(bookDetails);
    newBook.addPublishers(publishers);
    newBook.addAuthors(authors);
    newBook.addGenres(genres);

    const newLog: Audit = entityToLog('New Book', newBook, 'Books');
    await this.loggerRepository.save(newLog);

    return await this.booksRepository.save(newBook);
  }

  async showByAtoZ() {
    return await this.booksRepository.find({
      order: {
        bookTitle: 'ASC',
      },
    });
  }

  async showByZtoA() {
    return await this.booksRepository.find({
      order: {
        bookTitle: 'DESC',
      },
    });
  }

  async showByGenre() {
    return await this.booksRepository
      .createQueryBuilder()
      .select('subject')
      .addSelect("JSON_ARRAYAGG(JSON_OBJECT('bookTitle', bookTitle, 'id', id)) as books")
      .groupBy('subject')
      .getRawMany();
  }

  async showByCopyYear() {
    return await this.booksRepository
      .createQueryBuilder()
      .select('copyWriteYear')
      .addSelect("JSON_ARRAYAGG(JSON_OBJECT('bookTitle', bookTitle, 'id', id)) as books")
      .groupBy('copyWriteYear')
      .orderBy('copyWriteYear', 'DESC')
      .getRawMany();
  }

  async updateBook(id: number, bookDetails: createBookDto) {
    const publishers = await this.publishersRepository.findByIds(bookDetails.publisherIds);
    const authors = await this.authorRepository.findByIds(bookDetails.authorIds);
    const genres = await this.genreRepository.findByIds(bookDetails.genreIds);

    if (!publishers.length || !authors.length || !genres.length) {
      throw new NotFoundException('Publishers, Authors, or Genres not found');
    }

    let bookToUpdate = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'author')
      .leftJoinAndSelect('book.genres', 'genre')
      .leftJoinAndSelect('book.publishers', 'publisher')
      .where('book.id = :id', { id: id })
      .getOne();

    if (!bookToUpdate) {
      throw new NotFoundException('Book not found');
    }

    bookToUpdate.bookTitle = bookDetails.bookTitle;
    bookToUpdate.copyWriteYear = bookDetails.copyWriteYear;
    bookToUpdate.editionNumber = bookDetails.editionNumber;
    bookToUpdate.subject = bookDetails.subject;
    bookToUpdate.numberOfPages = bookDetails.numberOfPages;
    bookToUpdate.authors = authors;
    bookToUpdate.genres = genres;
    bookToUpdate.publishers = publishers;

    return await this.booksRepository.save(bookToUpdate);
  }

  async findByGenre(subject: any) {
    return await this.booksRepository.find({ where: { subject: subject } });
  }

  async deleteBook(id: number) {
    const book = await this.booksRepository.findOneById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return await this.booksRepository.delete(id);
  }

  async myBooks(id: number) {
    return await this.booksRepository
      .createQueryBuilder('book')
      .select()
      .innerJoin(BookStock, 'book_stock', 'book.id = book_stock.bookId')
      .innerJoin(Reservation, 'reservation', 'book_stock.id = reservation.bookStockId')
      .where(
        "reservation.userId = :userId AND (reservation.reservationStatus = 'Active' OR reservation.reservationStatus ='Done') ",
        { userId: id },
      )
      .getMany();
  }

  async searchBooks(bookTitle: string) {
    return await this.booksRepository
      .createQueryBuilder('book')
      .where('bookTitle LIKE :title', { title: `%${bookTitle}%` })
      .getMany();
  }

  async getBookById(id: number) {
    const book = await this.booksRepository.findOne({
      where: { id: id },
      relations: ['genres', 'authors', 'publishers'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async getBookStockCount(id: number) {
    return await this.bookStockRepo
      .createQueryBuilder()
      .select()
      .where('bookId = :id', { id: id })
      .getCount();
  }

  async getMostBorrowedBooks() {
    return await this.booksRepository
      .createQueryBuilder()
      .select()
      .innerJoin(BookStock, 'book_stock', 'book.id = book_stock.bookId')
      .innerJoin(Reservation, 'reservation', 'book_stock.id = reservation.bookStockId')
      .groupBy('book.id')
      .getMany();
  }
}
