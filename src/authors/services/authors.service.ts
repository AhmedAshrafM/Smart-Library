import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/entities/Author';
import { Repository } from 'typeorm';
import { createAuthorDto } from '../dtos/createAuthorDto.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorReposiotry: Repository<Author>,
  ) {}
  fetchAuthors(){
    return this.authorReposiotry.find();
  }
  createAuthor(createAuthorDto: createAuthorDto){
    let newAuthor = this.authorReposiotry.create({...createAuthorDto})
    return this.authorReposiotry.save(newAuthor);
  }
}
