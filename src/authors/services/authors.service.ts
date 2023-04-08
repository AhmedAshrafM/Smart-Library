import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { Author } from 'src/typeorm/entities/Author';
import { Repository } from 'typeorm';
import { createAuthorDto } from '../dtos/createAuthorDto.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorReposiotry: Repository<Author>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>
  ) {}
  fetchAuthors(){
    return this.authorReposiotry.find();
  }
  createAuthor(createAuthorDto: createAuthorDto){
    let newAuthor = this.authorReposiotry.create({...createAuthorDto})
    let newLog: Audit = entityToLog("New Author",newAuthor,"Authors")
    this.loggerRepo.save(newLog)
    return this.authorReposiotry.save(newAuthor);
  }
}
