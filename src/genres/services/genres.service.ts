import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { CreateGenreDto } from 'src/genres/dtos/createGenreDto.dto';
import { Audit } from 'src/typeorm/entities/Audit';
import { Genre } from 'src/typeorm/entities/Genre';
import { checkIfDataExists } from 'src/utils/checkIfDataExists.utils';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Audit) private loggerRepository: Repository<Audit>
  ) {}

  fetchGenre() {
    return this.genreRepository.find();
  }

  async createGenre(createGenreDTO: CreateGenreDto) {
    await checkIfDataExists (this.genreRepository, 'genreName', createGenreDTO.genreName);
    let newGenre = this.genreRepository.create({ ...createGenreDTO });

    const newLog: Audit = entityToLog('New Genre', newGenre, 'Genres');
    this.loggerRepository.save(newLog);

    return this.genreRepository.save(newGenre);
  }

  async updateGenreById(id: number, createGenreDTO: CreateGenreDto) {
    const genre = await this.genreRepository.findOneById(id);

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return await this.genreRepository.update(id, { ...createGenreDTO });
  }

  async getGenreById(id: number) {
    const genre = await this.genreRepository.findOneById(id);

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return genre;
  }

  async deleteGenreById(id: number) {
    const genre = await this.genreRepository.findOneById(id);

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return await this.genreRepository.delete(id);
  }
}
