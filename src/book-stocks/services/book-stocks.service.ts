import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createBookStockDto } from 'src/book-stocks/dtos/createBookStock.dto';
import { dtoToEntity } from 'src/book-stocks/mapper/bookStock.mapper';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { Book } from 'src/typeorm/entities/Book';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Distributor } from 'src/typeorm/entities/Distributor';
import { Repository } from 'typeorm';

@Injectable()
export class BookStocksService {
    constructor(
        @InjectRepository(BookStock)private bookStockRepository: Repository<BookStock>,
        @InjectRepository(Distributor) private distributorsRepository: Repository<Distributor>,
        @InjectRepository(Book) private bookRepository: Repository<Book>,
        @InjectRepository(Audit) private loggerRepo: Repository<Audit>,

    ){}
    async fetchBookStock(){
        return await this.bookStockRepository.find({
          relations: ["book","distributor"]
        })
    }
    async createBookStock(bookStockDetails: createBookStockDto) {
        const distributors = await this.distributorsRepository.findOneById(
          bookStockDetails.distributorId);
        const book = await this.bookRepository.findOneById(
          bookStockDetails.bookId
        );    
        let newBookStock: BookStock = dtoToEntity(bookStockDetails);
        newBookStock.addDistributors(distributors);
        newBookStock.addBook(book);
        let newLog: Audit = entityToLog("New Book",newBookStock,"Book Stock")
        this.loggerRepo.save(newLog)
        return this.bookStockRepository.save(newBookStock);
      }
      async updateBookStock(id: number, bookStockDetails: createBookStockDto) {
        const distributors = await this.distributorsRepository.findOneById(
          bookStockDetails.distributorId);
        const book = await this.bookRepository.findOneById(
          bookStockDetails.bookId
        );    
        let updatedBookStock : BookStock = dtoToEntity(bookStockDetails)
        updatedBookStock.addBook(book)
        updatedBookStock.addDistributors(distributors)

        return await this.bookStockRepository.update( id , { ...updatedBookStock });
      }
      async deleteBookStock(id: number) {
        return await this.bookStockRepository.delete(id);
      }
      async getBookStockById(id: number) {
        return await this.bookStockRepository.findOneById(id);
      }
    
}
