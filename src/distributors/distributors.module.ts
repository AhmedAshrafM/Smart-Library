import { Module } from '@nestjs/common';
import { DistributorsService } from './services/distributors/distributors.service';
import { DistributorsController } from './controllers/distributors/distributors.controller';

@Module({
  providers: [DistributorsService],
  controllers: [DistributorsController]
})
export class DistributorsModule {}
