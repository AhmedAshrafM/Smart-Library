import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { Author } from 'src/typeorm/entities/Author';
import { Repository } from 'typeorm';
import { createAuthorDto } from '../dtos/createAuthorDto.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Audit) private loggerRepository: Repository<Audit>,
  ) {}

  async fetchAuthors() {
    return await this.authorRepository.find();
  }

  async createAuthor(createAuthorDto: createAuthorDto) {
    const newAuthor = this.authorRepository.create({ ...createAuthorDto });

    const newLog: Audit = entityToLog('New Author', newAuthor, 'Authors');
    await this.loggerRepository.save(newLog);

    return await this.authorRepository.save(newAuthor);
  }

  async updateAuthorById(id: number, authorDetails: createAuthorDto) {
    const author = await this.authorRepository.findOneById(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return await this.authorRepository.update(id, { ...authorDetails });
  }

  async deleteAuthorById(id: number) {
    const author = await this.authorRepository.findOneById(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return await this.authorRepository.delete(id);
  }

  async getAuthorById(id: number) {
    const author = await this.authorRepository.findOneById(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }
}
