import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { Role } from './Roles';
import {Role} from '../../roles/role.enum'
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
  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
    
  })
  public roles: Role[]
  //@ManyToMany(() => Role)
//  @JoinTable({name:'users_roles'})
 // roles: Role[];

 // public addRoles(roles: Role[]) {
 //   this.roles = roles;
//  }
}
