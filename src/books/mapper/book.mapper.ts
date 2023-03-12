import { Book } from 'src/typeorm/entities/Book';
import { createBookDto } from '../dtos/createBook.dto';

export const dtoToEntity = (creationDto: createBookDto): Book => {
  let book: Book = new Book();
  book.subject = creationDto.subject;
  book.bookTitle = creationDto.bookTitle;
  book.numberOfPages = creationDto.numberOfPages;
  book.editionNumber = creationDto.editionNumber;
  book.copyWriteYear = creationDto.copyWriteYear;
  return book;
};
