import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStock } from './BookStock';
import { Notification } from './Notification';
import { User } from './User';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  reservationDate: Date;
  @Column()
  dueDate: Date;
  @Column({default: null})
  returnDate: Date;
  @Column({default:"pending"})
  reservationStatus: string;
  @ManyToOne(() => User)
  @JoinColumn()
  userId: User;
  @OneToMany(() => Notification, (notification) => notification.reservation)
  @JoinColumn()
  notifications: Notification;
  @OneToOne(() => BookStock, (stock) => stock.reservation)
  @JoinColumn()
  bookStockId: BookStock;
  public addUser(user: User) {
    this.userId = user;
  }
  public addBookStock(bookStock: BookStock) {
    this.bookStockId = bookStock;
  }
}
