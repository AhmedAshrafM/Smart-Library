import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
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
  @Roles(Role.Admin,Role.SuperAdmin)
  @Post()
  CreateGenre(@Body() createGenreDto: CreateGenreDto) {
    this.genreService.createGenre(createGenreDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getGenreById(@Param('id', ParseIntPipe) id: number) {
    return await this.genreService.getGenreById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateGenreById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createGenreDto: CreateGenreDto,
  ) {
    await this.genreService.updateGenreById(id, createGenreDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteGenreById(@Param('id', ParseIntPipe) id: number) {
    await this.genreService.deleteGenreById(id);
  }
}
