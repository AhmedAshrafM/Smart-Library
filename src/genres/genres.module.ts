import { Module } from '@nestjs/common';
import { GenresService } from './services/genres.service';
import { GenresController } from './controllers/genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/typeorm/entities/Genre';
import { Audit } from 'src/typeorm/entities/Audit';

@Module({
  imports: [TypeOrmModule.forFeature([Genre,Audit])],
  providers: [GenresService],
  controllers: [GenresController]
})
export class GenresModule {}
