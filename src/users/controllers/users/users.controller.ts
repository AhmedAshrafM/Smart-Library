import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { updateUserDto } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.userService.createUser(body);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: updateUserDto,
  ) {
   await this.userService.updateUser(id,updateUserDto);
  }
  @Delete(':id')
  async deleteUserById(
    @Param('id', ParseIntPipe) id: number) {
   await this.userService.deleteUser(id);
  }
}
