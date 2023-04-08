import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Roles';
import { User } from 'src/typeorm/entities/User';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { dtoToEntity } from 'src/users/mapper/user.mapper';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>
  ) {}

  fetchUsers() {
    return this.usersRepository.find();
  }

  async createUser(userDetails: createUserDto) {
   // const roles = await this.rolesRepository.findByIds(userDetails.roleIds);
    let newUser : User = dtoToEntity(userDetails);
    //newUser.addRoles(roles);
    newUser.password = await bcrypt.hash(newUser.password,10)
    return this.usersRepository.save(newUser);
  }
  async findUserById(id: number){
    return await this.usersRepository.findOneById(id);
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.usersRepository.update( id , { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email});
  }
}
