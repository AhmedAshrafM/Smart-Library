import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { createBookStockDto } from 'src/book-stocks/dtos/createBookStock.dto';
import { BookStocksService } from 'src/book-stocks/services/book-stocks.service';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';

@Controller('book-stocks')
export class BookStocksController {
    constructor(private bookStockService: BookStocksService){}
    @Get()
    getBookStock() {
        return this.bookStockService.fetchBookStock();
      }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.SuperAdmin)
  @Post()
  createBookStock(@Body() createBookStockDto: createBookStockDto) {
    this.bookStockService.createBookStock(createBookStockDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateBookStockById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookStockDto: createBookStockDto,
  ) {
    await this.bookStockService.updateBookStock(id, createBookStockDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.bookStockService.deleteBookStock(id);
  }
}
