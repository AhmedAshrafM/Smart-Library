import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
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
    @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getPublisherById(@Param('id', ParseIntPipe) id: number) {
    return await this.publisherService.getPublisherById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updatePublisherById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPublisherDto: createPublisherDto,
  ) {
    await this.publisherService.updatePublisherById(id, createPublisherDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deletePublisherById(@Param('id', ParseIntPipe) id: number) {
    await this.publisherService.deletePublisherById(id);
  }
}
