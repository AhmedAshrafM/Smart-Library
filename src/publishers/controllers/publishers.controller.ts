import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { createPublisherDto } from '../dtos/createPublisher.dto';
import { PublishersService } from '../services/publishers.service';

@Controller('publishers')
export class PublishersController {
    constructor(private publisherService: PublishersService) {}
    @Get()
    getPublishers() {
      return this.publisherService.fetchPublishers();
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.SuperAdmin)
    @Post()
    createPublisher(@Body() createPublisherDto: createPublisherDto) {
      this.publisherService.createPublisher(createPublisherDto);
    }
}
