import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.SuperAdmin)
  @Post()
  createDistributor(@Body() createDistributorDto: createDistributorDto) {
    this.distributorService.createDistributor(createDistributorDto);
  }
}
