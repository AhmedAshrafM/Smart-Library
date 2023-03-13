import { Body, Controller, Get, Post } from '@nestjs/common';
import { createBookStockDto } from 'src/book-stocks/dtos/createBookStock.dto';
import { BookStocksService } from 'src/book-stocks/services/book-stocks.service';

@Controller('book-stocks')
export class BookStocksController {
    constructor(private bookStockService: BookStocksService){}
    @Get()
    getBookStock() {
        return this.bookStockService.fetchBookStock();
      }
    @Post()
  createBookStock(@Body() createBookStockDto: createBookStockDto) {
    this.bookStockService.createBookStock(createBookStockDto);
  }
}
