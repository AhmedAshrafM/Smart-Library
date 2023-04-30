import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
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
  @Get('/showby/atoz')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User,Role.Admin,Role.SuperAdmin)
  async getBookByAlphaAsc(){
    return this.bookService.showByAtoZ();
  }
  @Get('/showby/ztoa')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User,Role.Admin,Role.SuperAdmin)
  async getBookByAlphaDesc(){
    return this.bookService.showByZtoA();
  }
  @Get('/showby/genre')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User,Role.Admin,Role.SuperAdmin)
  async getBookBySubject(){
    return this.bookService.showByGenre();
  }
  @Get('/showby/copyyear')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.User,Role.Admin,Role.SuperAdmin)
  async getBookByCopyYear(){
    return this.bookService.showByCopyYear();
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.SuperAdmin)
  @Put(':id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookDto: createBookDto ,
  ) {
   await this.bookService.updateBook(id,createBookDto);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.SuperAdmin)
  @Delete(':id')
  async deleteBookById(
    @Param('id', ParseIntPipe) id: number) {
      return await this.bookService.deleteBook(id)
}
}