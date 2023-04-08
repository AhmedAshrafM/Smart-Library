import { Module } from '@nestjs/common';
import { PublishersService } from './services/publishers.service';
import { PublishersController } from './controllers/publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from 'src/typeorm/entities/Publisher';
import { Audit } from 'src/typeorm/entities/Audit';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, Audit])],
  providers: [PublishersService],
  controllers: [PublishersController]
})
export class PublishersModule {}
