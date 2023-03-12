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
  @Column()
  returnDate: Date;
  @Column()
  reservationStatus: string;
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
  @OneToMany(() => Notification, (notification) => notification.reservation)
  @JoinColumn()
  notifications: Notification;
  @OneToOne(() => BookStock, (stock) => stock.reservation)
  @JoinColumn()
  bookStock: BookStock;
}
