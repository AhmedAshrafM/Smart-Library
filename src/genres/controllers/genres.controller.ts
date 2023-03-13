import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGenreDto } from '../dtos/createGenreDto.dto';
import { GenresService } from '../services/genres.service';

@Controller('genres')
export  class GenresController {
  constructor(private genreService: GenresService) {}
  @Get()
  getGenres() {
    return this.genreService.fetchGenre();
  }
  @Post()
  CreateGenre(@Body() createGenreDto: CreateGenreDto) {
    this.genreService.createGenre(createGenreDto);
  }
}
