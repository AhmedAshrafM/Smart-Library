import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { stringify } from 'querystring';
import { JwtAuthGuard, Public } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { updateUserDto } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  async getUsers() {
    try {
      return await this.userService.fetchUsers();
    } catch (error) {
      throw new NotFoundException('Failed to fetch users.');
    }
  }

  @Public()
  @Post('/signup')
  async createUser(@Body() body: createUserDto) {
    try {
      return await this.userService.createUser(body);
    } catch (error) {
      throw new BadRequestException('Failed to create user. Email may already exists.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: updateUserDto,
  ) {
    try {
      await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException('Failed to update user, ID not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new NotFoundException('Failed to delete user, ID not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      throw new NotFoundException('Failed to fetch user, ID not found.');
    }
  }
}
