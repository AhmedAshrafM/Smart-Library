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
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { CreateGenreDto } from '../dtos/createGenreDto.dto';
import { GenresService } from '../services/genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genreService: GenresService) {}

  @Get()
  async getGenres() {
    try {
      return await this.genreService.fetchGenre();
    } catch (error) {
      throw new NotFoundException('Failed to fetch genres.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    try {
      return await this.genreService.createGenre(createGenreDto);
    } catch (error) {
      throw new ConflictException('Failed to create genre. Name may already exists.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getGenreById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.genreService.getGenreById(id);
    } catch (error) {
      throw new NotFoundException('Failed to fetch genre by ID.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateGenreById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createGenreDto: CreateGenreDto,
  ) {
    try {
      return await this.genreService.updateGenreById(id, createGenreDto);
    } catch (error) {
      throw new NotFoundException('Failed to update genre.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteGenreById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.genreService.deleteGenreById(id);
    } catch (error) {
      throw new NotFoundException('Failed to delete genre.');
    }
  }
}
