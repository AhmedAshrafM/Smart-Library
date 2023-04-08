import { Module } from '@nestjs/common';
import { AuthorsService } from './services/authors.service';
import { AuthorsController } from './controllers/authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/entities/Author';
import { Audit } from 'src/typeorm/entities/Audit';

@Module({
  imports: [TypeOrmModule.forFeature([Author,Audit])],
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
