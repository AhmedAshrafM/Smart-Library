import {
  Body,
  ConflictException,
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { createAuthorDto } from '../dtos/createAuthorDto.dto';
import { AuthorsService } from '../services/authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  @Get()
  async getAuthors() {
    return await this.authorService.fetchAuthors();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createAuthor(@Body() createAuthorDto: createAuthorDto) {
    try {
      return await this.authorService.createAuthor(createAuthorDto);
    } catch (error) {
      throw new ConflictException('Author Already Exists.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthor: createAuthorDto,
  ) {
    try {
      return await this.authorService.updateAuthorById(id, updateAuthor);
    } catch (error) {
      throw new NotFoundException('Author not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteAuthorById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.authorService.deleteAuthorById(id);
    } catch (error) {
      throw new NotFoundException('Author not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getAuthorById(@Param('id', ParseIntPipe) id: number) {
    try {
      const author = await this.authorService.getAuthorById(id);
      return author;
    } catch (error) {
      throw new NotFoundException('Author not found.');
    }
  }
}
