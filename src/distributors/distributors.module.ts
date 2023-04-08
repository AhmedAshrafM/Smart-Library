import { Module } from '@nestjs/common';
import { DistributorsService } from './services/distributors.service';
import { DistributorsController } from './controllers/distributors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distributor } from 'src/typeorm/entities/Distributor';
import { Audit } from 'src/typeorm/entities/Audit';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor, Audit])],
  providers: [DistributorsService],
  controllers: [DistributorsController]
})
export class DistributorsModule {}
