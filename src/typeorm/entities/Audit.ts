
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Audit {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column({
        type: "json"
    })
    body: any;
    @Column()
    entity: string;
}

