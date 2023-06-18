import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
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
  async getBooks() {
    try {
      return await this.bookService.fetchBooks();
    } catch (error) {
      throw new NotFoundException('Failed to fetch books.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getABookById(@Param('id', ParseIntPipe) id: number) {
    try {
      const book = await this.bookService.getBookById(id);
      return book;
    } catch (error) {
      throw new NotFoundException('Book not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createBook(@Body() createBookDto: createBookDto) {
    try {
      return await this.bookService.createBook(createBookDto);
    } catch (error) {
      throw new ConflictException('Failed to create book.');
    }
  }

  @Get('/genre/:genre')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  async getBookByGenre(@Param('genre') subject: any) {
    try {
      return await this.bookService.findByGenre(subject);
    } catch (error) {
      throw new NotFoundException('Failed to fetch books by genre.');
    }
  }

  @Get('/showby/atoz')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  async getBookByAlphaAsc() {
    try {
      return await this.bookService.showByAtoZ();
    } catch (error) {
      throw new NotFoundException('Failed to fetch books.');
    }
  }

  @Get('/showby/ztoa')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  async getBookByAlphaDesc() {
    try {
      return await this.bookService.showByZtoA();
    } catch (error) {
      throw new NotFoundException('Failed to fetch books.');
    }
  }

  @Get('/showby/genre')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  async getBookBySubject() {
    try {
      return await this.bookService.showByGenre();
    } catch (error) {
      throw new NotFoundException('Failed to fetch books.');
    }
  }

  @Get('/showby/copyyear')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  async getBookByCopyYear() {
    try {
      return await this.bookService.showByCopyYear();
    } catch (error) {
      throw new NotFoundException('Failed to fetch books.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookDto: createBookDto,
  ) {
    try {
      return await this.bookService.updateBook(id, createBookDto);
    } catch (error) {
      throw new NotFoundException('Book not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteBookById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookService.deleteBook(id);
    } catch (error) {
      throw new NotFoundException('Book not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('/id/:id')
  async getUserBooks(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookService.myBooks(id);
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('/stock/:id')
  async getBookStock(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookService.getBookStockCount(id);
    } catch (error) {
      throw new NotFoundException('Book Stock not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('/search/:bookTitle')
  async searchBookByTitle(@Param('bookTitle') bookTitle: string) {
    try {
      return await this.bookService.searchBooks(bookTitle);
    } catch (error) {
      throw new NotFoundException(
        'No books found matching the search criteria.',
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('/home/MBB')
  async getMostBorrowedBooks() {
    try {
      return await this.bookService.getMostBorrowedBooks();
    } catch (error) {
      throw new NotFoundException('Failed to fetch most borrowed books.');
    }
  }
}
