import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { createDistributorDto } from 'src/distributors/dtos/createDistributor.to';
import { DistributorsService } from 'src/distributors/services/distributors.service';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';

@Controller('distributors')
export class DistributorsController {
  constructor(private distributorService: DistributorsService) {}
  @Get()
  getDistributors() {
    return this.distributorService.fetchDistributors();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createDistributor(@Body() createDistributorDto: createDistributorDto) {
    try{
    return await this.distributorService.createDistributor(createDistributorDto);
    }catch(error){
      throw new ConflictException('Failed to create distributor, name may already exists.');
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateDistributorById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDistributorDto: createDistributorDto,
  ) {
    await this.distributorService.updateDistributorById(
      id,
      createDistributorDto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteDistributorById(@Param('id', ParseIntPipe) id: number) {
    await this.distributorService.deleteDistributorById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getDistribById(@Param('id', ParseIntPipe) id: number) {
    return await this.distributorService.getDistributorById(id);
  }
}
