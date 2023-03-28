import { Module } from '@nestjs/common';
import { PublishersService } from './services/publishers.service';
import { PublishersController } from './controllers/publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from 'src/typeorm/entities/Publisher';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService],
  controllers: [PublishersController]
})
export class PublishersModule {}
