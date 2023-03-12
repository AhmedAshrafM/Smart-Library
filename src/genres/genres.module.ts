import { Module } from '@nestjs/common';
import { GenresService } from './services/genres/genres.service';
import { GenresController } from './controllers/genres/genres.controller';

@Module({
  providers: [GenresService],
  controllers: [GenresController]
})
export class GenresModule {}
