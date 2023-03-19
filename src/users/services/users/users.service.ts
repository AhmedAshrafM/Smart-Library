import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Roles';
import { User } from 'src/typeorm/entities/User';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { dtoToEntity } from 'src/users/mapper/user.mapper';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

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
    const roles = await this.rolesRepository.findByIds(userDetails.roleIds);
    let newUser : User = dtoToEntity(userDetails);
    newUser.addRoles(roles);
    return this.usersRepository.save(newUser);
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.usersRepository.update( id , { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }
}
