import { BookStock } from "src/typeorm/entities/BookStock";
import { createBookStockDto } from "../dtos/createBookStock.dto";

export const dtoToEntity = (creationDto: createBookStockDto): BookStock => {
    let bookStock: BookStock = new BookStock();
    bookStock.shelf = creationDto.shelf;
    return bookStock;
  };
