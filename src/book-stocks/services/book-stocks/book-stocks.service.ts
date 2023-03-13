import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createBookStockDto } from 'src/book-stocks/dtos/createBookStock.dto';
import { dtoToEntity } from 'src/book-stocks/mapper/bookStock.mapper';
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

    ){}
    fetchBookStock(){
        return this.bookStockRepository.find()
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
    
        return this.bookStockRepository.save(newBookStock);
      }
}
