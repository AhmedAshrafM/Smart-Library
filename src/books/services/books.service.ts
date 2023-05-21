import { Injectable } from '@nestjs/common';
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

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>,
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(BookStock) private bookStockRepo: Repository<BookStock>
  ) {}

  fetchBooks() {
    return this.booksRepository.find();
  }

  async createBook(bookDetails: createBookDto) {
    const publishers = await this.publishersRepository.findByIds(
      bookDetails.publisherIds,
    );
    const authors = await this.authorRepository.findByIds(
      bookDetails.authorIds,
    );
    const genres = await this.genreRepository.findByIds(bookDetails.genreIds);
    
    let newBook: Book = dtoToEntity(bookDetails);
    newBook.addPublishers(publishers);
    newBook.addAuthors(authors);
    newBook.addGenres(genres);
    let newLog: Audit = entityToLog("New Book",newBook,"Books")
    this.loggerRepo.save(newLog)
    return this.booksRepository.save(newBook);
  }
 
  async showByAtoZ(){
    return this.booksRepository.find({order: {
      bookTitle: "ASC"
    }})
  }
  async showByZtoA(){
    return this.booksRepository.find({order: {
      bookTitle: "DESC"
    }})
  }
  async showByGenre(){
    
    return this.booksRepository.createQueryBuilder().select("subject").addSelect("JSON_ARRAYAGG(JSON_OBJECT('bookTitle', bookTitle, 'id', id)) as books").groupBy("subject").getRawMany()
  }
  async showByCopyYear(){
    return this.booksRepository.createQueryBuilder().select("copyWriteYear").addSelect("JSON_ARRAYAGG(JSON_OBJECT('bookTitle', bookTitle, 'id', id)) as books").groupBy("copyWriteYear").orderBy("copyWriteYear", "DESC").getRawMany()
  }
  async updateBook(id: number, bookDetails: createBookDto) {
    const publishers = await this.publishersRepository.findByIds(
      bookDetails.publisherIds,
    );
    const authors = await this.authorRepository.findByIds(
      bookDetails.authorIds,
    );
    const genres = await this.genreRepository.findByIds(bookDetails.genreIds);
    let bookToUpdate = await this.booksRepository.createQueryBuilder("book").leftJoinAndSelect("book.authors","author").leftJoinAndSelect("book.genres","genre").leftJoinAndSelect("book.publishers","publisher").where("book.id = :id", {id: id}).getOne()
   bookToUpdate.bookTitle = bookDetails.bookTitle
   bookToUpdate.copyWriteYear = bookDetails.copyWriteYear
   bookToUpdate.editionNumber = bookDetails.editionNumber
   bookToUpdate.subject = bookDetails.subject
   bookToUpdate.numberOfPages = bookDetails.numberOfPages
   bookToUpdate.authors = authors
   bookToUpdate.genres = genres
   bookToUpdate.publishers = publishers

    return await this.booksRepository.save(bookToUpdate)
  }
  async findByGenre(subject: any) {
    return this.booksRepository.find({where: { subject: subject }})
  }
  async deleteBook(id: number) {
    return this.booksRepository.delete(id);
  }
  async myBooks(id: number){
  return await this.booksRepository.createQueryBuilder("book")
    .select()
    .innerJoin(BookStock,"book_stock", "book.id = book_stock.bookId")
    .innerJoin(Reservation,"reservation", "book_stock.id = reservation.bookStockId")
    .where("reservation.userId = :userId", { userId: id}).getMany()
    
  }
  async searchBooks(bookTitle:string){    
    return await this.booksRepository.createQueryBuilder('book').where('bookTitle LIKE :title',{title: `%${bookTitle}%`}).getMany()
  }
  async getBookById(id: number) {
    return await this.booksRepository.find({where:{id : id},relations: ["genres","authors","publishers"]});
  }
  async getBookStockCount(id: number){
    return await this.bookStockRepo.createQueryBuilder().select().where(
      "bookId = :id",{id: id}
    ).getCount()
  }
}
