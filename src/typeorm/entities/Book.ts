import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Author } from './Author';
import { BookStock } from './BookStock';
import { Genre } from './Genre';
import { Publisher } from './Publisher';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bookTitle: string;
  @Column()
  copyWriteYear: number;
  @Column()
  subject: string;
  @Column()
  editionNumber: number;
  @Column()
  numberOfPages: number;
  @ManyToMany(() => Genre, (genre) => genre.books)
  genres: Genre[];
  @ManyToMany(() => Author)
  @JoinTable({ name: 'books_authors' })
  authors: Author[];
  @ManyToMany(() => Publisher, (publisher) => publisher.books)
  @JoinTable({ name: 'books_publishers' })
  publishers: Publisher[];
  @OneToMany(() => BookStock, (bookstock) => bookstock.book, {onDelete: 'CASCADE'})
  @JoinTable()
  bookStocks: BookStock[];

  public addPublishers(publishers: Publisher[]) {
    this.publishers = publishers;
  }

  public addAuthors(authors: Author[]) {
    this.authors = authors;
  }

  public addGenres(genres: Genre[]) {
    this.genres = genres;
  }
}
