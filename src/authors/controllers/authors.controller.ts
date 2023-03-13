import { Body, Controller, Get, Post } from '@nestjs/common';
import { createAuthorDto } from '../dtos/createAuthorDto.dto';
import { AuthorsService } from '../services/authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}
  @Get()
  getAuthors() {
    return this.authorService.fetchAuthors();
  }
  @Post()
  createAuthor(@Body() createAuthorDto: createAuthorDto) {
    this.authorService.createAuthor(createAuthorDto);
  }
}
