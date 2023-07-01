import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Roles';
import { User } from 'src/typeorm/entities/User';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { dtoToEntity } from 'src/users/mapper/user.mapper';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Audit } from 'src/typeorm/entities/Audit';
import { entityToLog } from 'src/books/mapper/logger.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>,
  ) {}

  fetchUsers() {
    return this.usersRepository.find();
  }

  async createUser(userDetails: createUserDto) {
    const user = await this.usersRepository.findOneBy({email: userDetails.email});
    if (user) {
      throw new ConflictException('User already exists');
    }
    let newUser: User = dtoToEntity(userDetails);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    let newLog: Audit = entityToLog('New User', newUser, 'Users');
    this.loggerRepo.save(newLog);
    return this.usersRepository.save(newUser);
  }

  async findUserById(id: number) {
    return await this.usersRepository.findOneById(id);
  }

  async updateUser(id: number, updateUserDetails: UpdateUserParams) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.update(id, { ...updateUserDetails });
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.delete(id);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email});
  }
}
