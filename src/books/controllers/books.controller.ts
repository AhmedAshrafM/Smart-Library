import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BooksService } from 'src/books/services/books.service';
import { createBookDto } from 'src/books/dtos/createBook.dto';
import { JwtAuthGuard, Public } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import Role from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';
import { Book } from 'src/typeorm/entities/Book';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}
  
  @Get()
  getBooks() {
    return this.bookService.fetchBooks();
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.SuperAdmin)
  @Post()
  createBook(@Body() createBookDto: createBookDto) {
    this.bookService.createBook(createBookDto);
  }
  @Get('/:genre')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User,Role.Admin,Role.SuperAdmin)
  async getBookByGenre(@Param('genre') subject:string): Promise<Book[]>{
    return this.bookService.findByGenre(subject);
  }
}
