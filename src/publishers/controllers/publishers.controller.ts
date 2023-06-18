import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
  async getPublishers() {
    try {
      return await this.publisherService.fetchPublishers();
    } catch (error) {
      throw new NotFoundException('Failed to fetch publishers.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createPublisher(@Body() createPublisherDto: createPublisherDto) {
    try {
      return await this.publisherService.createPublisher(createPublisherDto);
    } catch (error) {
      throw new ConflictException('Failed to create publisher.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getPublisherById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.publisherService.getPublisherById(id);
    } catch (error) {
      throw new NotFoundException('Failed to get publisher by ID.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updatePublisherById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPublisherDto: createPublisherDto,
  ) {
    try {
      return await this.publisherService.updatePublisherById(
        id,
        createPublisherDto,
      );
    } catch (error) {
      throw new NotFoundException('Failed to update publisher.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deletePublisherById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.publisherService.deletePublisherById(id);
    } catch (error) {
      throw new NotFoundException('Failed to delete publisher.');
    }
  }
}
