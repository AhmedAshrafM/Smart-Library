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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { createBookStockDto } from 'src/book-stocks/dtos/createBookStock.dto';
import { BookStocksService } from 'src/book-stocks/services/book-stocks.service';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';

@Controller('book-stocks')
export class BookStocksController {
  constructor(private bookStockService: BookStocksService) {}

  @Get()
  async getBookStock() {
    try {
      return await this.bookStockService.fetchBookStock();
    } catch (error) {
      throw new NotFoundException('Failed to fetch book stocks.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createBookStock(@Body() createBookStockDto: createBookStockDto) {
    try {
      return await this.bookStockService.createBookStock(createBookStockDto);
    } catch (error) {
      throw new ConflictException('Failed to create book stock.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateBookStockById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookStockDto: createBookStockDto,
  ) {
    try {
      return await this.bookStockService.updateBookStock(
        id,
        createBookStockDto,
      );
    } catch (error) {
      throw new NotFoundException('Failed to update book stock.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookStockService.deleteBookStock(id);
    } catch (error) {
      throw new NotFoundException('Failed to delete book stock.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getBookStockById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bookStockService.getBookStockById(id);
    } catch (error) {
      throw new NotFoundException('Failed to fetch book stock by ID.');
    }
  }
}
