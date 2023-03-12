import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    authorName: string;
}
