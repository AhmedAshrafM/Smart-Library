import { Body, Controller, Get, Post } from '@nestjs/common';
import { createDistributorDto } from 'src/distributors/dtos/createDistributor.to';
import { DistributorsService } from 'src/distributors/services/distributors.service';

@Controller('distributors')
export class DistributorsController {
  constructor(private distributorService: DistributorsService) {}
  @Get()
  getDistributors() {
    return this.distributorService.fetchDistributors();
  }
  @Post()
  createDistributor(@Body() createDistributorDto: createDistributorDto) {
    this.distributorService.createDistributor(createDistributorDto);
  }
}
