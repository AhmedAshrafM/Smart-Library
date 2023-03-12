import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookStock } from './BookStock';

@Entity()
export class Distributor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  distributorName: string;
  @OneToMany(() => BookStock, (bookStock) => bookStock.distributor)
  bookStocks!: BookStock[];
}
