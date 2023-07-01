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
  @JoinColumn({name: "userId"})
  userId: User;
  @OneToMany(() => Notification, (notification) => notification.reservation, {onDelete: 'CASCADE'})
  @JoinColumn()
  notifications: Notification;
  @ManyToOne(() => BookStock, (stock) => stock.reservation)
  @JoinColumn({name:"bookStockId"})
  bookStockId: BookStock;
  public addUser(user: User) {
    this.userId = user;
  }
  public addBookStock(bookStock: BookStock) {
    this.bookStockId = bookStock;
  }
}
