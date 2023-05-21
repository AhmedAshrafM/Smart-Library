import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  publisherName: string;
  @ManyToMany(() => Book,{onDelete:"CASCADE"})
  books: Book[];
}
