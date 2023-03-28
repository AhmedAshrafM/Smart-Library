import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPublisherDto } from '../dtos/createPublisher.dto';
import { PublishersService } from '../services/publishers.service';

@Controller('publishers')
export class PublishersController {
    constructor(private publisherService: PublishersService) {}
    @Get()
    getPublishers() {
      return this.publisherService.fetchPublishers();
    }
    @Post()
    createPublisher(@Body() createPublisherDto: createPublisherDto) {
      this.publisherService.createPublisher(createPublisherDto);
    }
}
