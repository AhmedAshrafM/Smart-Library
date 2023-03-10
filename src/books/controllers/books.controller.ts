import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from 'src/books/services/books.service';
import { createBookDto } from 'src/books/dtos/createBook.dto';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}

  @Get()
  getBooks() {
    return this.bookService.fetchBooks();
  }

  @Post()
  createBook(@Body() createBookDto: createBookDto) {
    this.bookService.createBook(createBookDto);
  }
}
