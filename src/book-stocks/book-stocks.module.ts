import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/typeorm/entities/Book';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Distributor } from 'src/typeorm/entities/Distributor';
import { BookStocksController } from './controllers/book-stocks.controller';
import { BookStocksService } from './services/book-stocks.service';

@Module({
  imports:[TypeOrmModule.forFeature([Book,Distributor,BookStock])],
  providers:[BookStocksService],
  controllers: [BookStocksController]
})
export class BookStocksModule {}
