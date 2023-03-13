import { Module } from '@nestjs/common';
import { DistributorsService } from './services/distributors.service';
import { DistributorsController } from './controllers/distributors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distributor } from 'src/typeorm/entities/Distributor';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor])],
  providers: [DistributorsService],
  controllers: [DistributorsController]
})
export class DistributorsModule {}
