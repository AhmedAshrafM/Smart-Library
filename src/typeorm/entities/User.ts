import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fullName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  flag: string;
  @Column()
  createdAt: Date;
  @Column()
  phone: string;
  @ManyToMany(() => Role)
  @JoinTable({name:'users_roles'})
  roles: Role[];

  public addRoles(roles: Role[]) {
    this.roles = roles;
  }
}
