import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { CreateGenreDto } from 'src/genres/dtos/createGenreDto.dto';
import { Audit } from 'src/typeorm/entities/Audit';
import { Genre } from 'src/typeorm/entities/Genre';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>
  ) {}
  fetchGenre() {
    return this.genreRepository.find();
  }
  createGenre(createGenreDTO: CreateGenreDto) {
    let newGenre = this.genreRepository.create({ ...createGenreDTO });
    let newLog: Audit = entityToLog("New Genre",newGenre,"Genres")
    this.loggerRepo.save(newLog)
    return this.genreRepository.save(newGenre);
  }
}
