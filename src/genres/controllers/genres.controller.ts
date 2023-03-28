import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { CreateGenreDto } from '../dtos/createGenreDto.dto';
import { GenresService } from '../services/genres.service';

@Controller('genres')
export  class GenresController {
  constructor(private genreService: GenresService) {}
  @Get()
  getGenres() {
    return this.genreService.fetchGenre();
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin || Role.SuperAdmin)
  @Post()
  CreateGenre(@Body() createGenreDto: CreateGenreDto) {
    this.genreService.createGenre(createGenreDto);
  }
}
