import { Module } from '@nestjs/common';
import { PublishersService } from './services/publishers/publishers.service';
import { PublishersController } from './controllers/publishers/publishers.controller';

@Module({
  providers: [PublishersService],
  controllers: [PublishersController]
})
export class PublishersModule {}
