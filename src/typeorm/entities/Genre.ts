import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  genreName: string;
  @ManyToMany(() => Book, (book) => book.genres, { onDelete:"CASCADE" })
  @JoinTable({name:'books_genres'})
  books: Book[];
}
