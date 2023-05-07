import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';
import { Distributor } from './Distributor';
import { Reservation } from './Reservation';

@Entity()
export class BookStock {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  shelf: string;
  @ManyToOne(() => Distributor, (distributor) => distributor.bookStocks)
  distributor: Distributor;
  @ManyToOne(() => Book, (book) => book.bookStocks)
  book: Book;
  @OneToMany(() => Reservation,(reservation)=> reservation.bookStockId,{onDelete: "CASCADE"})
  reservation: Reservation;
  public addDistributors(distributor: Distributor) {
    this.distributor = distributor;
  }
  public addBook(book: Book) {
    this.book = book;
  }
}
