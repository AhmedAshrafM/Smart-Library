import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BooksService } from 'src/books/services/books.service';
import { createBookDto } from 'src/books/dtos/createBook.dto';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import Role from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}
  
  @Get()
  getBooks() {
    return this.bookService.fetchBooks();
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin || Role.SuperAdmin)
  @Post()
  createBook(@Body() createBookDto: createBookDto) {
    this.bookService.createBook(createBookDto);
  }
}
