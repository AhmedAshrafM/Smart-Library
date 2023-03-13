import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from 'src/genres/dtos/createGenreDto.dto';
import { Genre } from 'src/typeorm/entities/Genre';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}
  fetchGenre() {
    return this.genreRepository.find();
  }
  createGenre(createGenreDTO: CreateGenreDto) {
    let newGenre = this.genreRepository.create({ ...createGenreDTO });
    return this.genreRepository.save(newGenre);
  }
}
