import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './Reservation';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notificationId: number;
  @Column()
  subject: string;
  @Column({
    type: 'json'
  })
  payload: any;
  @ManyToOne(() => Reservation, (reservation) => reservation.notifications)
  @JoinColumn()
  reservation: Reservation;
}
