import {
  Body,
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
  createDistributor(@Body() createDistributorDto: createDistributorDto) {
    this.distributorService.createDistributor(createDistributorDto);
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
}
