import {
  Body,
  Controller,
  Delete,
  Get,
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
  getAuthors() {
    return this.authorService.fetchAuthors();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  createAuthor(@Body() createAuthorDto: createAuthorDto) {
    this.authorService.createAuthor(createAuthorDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthor: createAuthorDto,
  ) {
    await this.authorService.updateAuthorById(id, updateAuthor);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteAuthorById(@Param('id', ParseIntPipe) id: number) {
    await this.authorService.deleteAuthorById(id);
  }
}
