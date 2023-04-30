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

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>,
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
  async findByGenre(subject: string): Promise<Book[]> {
    return this.booksRepository.find({where: { subject }})
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
  async deleteBook(id: number) {
    return this.booksRepository.delete(id);
  }
}
