import {  Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { Book } from 'src/typeorm/entities/Book';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from 'src/typeorm/entities/Publisher';
import { Author } from 'src/typeorm/entities/Author';
import { Genre } from 'src/typeorm/entities/Genre';
import { Audit } from 'src/typeorm/entities/Audit';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { BookStock } from 'src/typeorm/entities/BookStock';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Publisher, Genre, Audit, Reservation, BookStock])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
