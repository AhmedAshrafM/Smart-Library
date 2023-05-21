import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    authorName: string;
    @ManyToMany(() => Book, (book) => book.authors, {onUpdate: 'CASCADE',onDelete: 'CASCADE'})
    books: Book[];

}
