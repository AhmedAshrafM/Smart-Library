import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { createDistributorDto } from 'src/distributors/dtos/createDistributor.to';
import { Audit } from 'src/typeorm/entities/Audit';
import { Distributor } from 'src/typeorm/entities/Distributor';
import { Repository } from 'typeorm';

@Injectable()
export class DistributorsService {
  constructor(
    @InjectRepository(Distributor)
    private distributorsRepository: Repository<Distributor>,
    @InjectRepository(Audit) private loggerRepo: Repository<Audit>,
  ) {}
  fetchDistributors() {
    return this.distributorsRepository.find();
  }
  async createDistributor(distributorDetails: createDistributorDto) {
    let newDistributor = this.distributorsRepository.create({
      ...distributorDetails,
    });
    let newLog: Audit = entityToLog(
      'New Distributor',
      newDistributor,
      'Distributors',
    );
    this.loggerRepo.save(newLog);
    return this.distributorsRepository.save(newDistributor);
  }
  async updateDistributorById(
    id: number,
    distributorDetails: createDistributorDto,
  ) {
    return await this.distributorsRepository.update(id, {
      ...distributorDetails,
    });
  }
  async deleteDistributorById(id: number) {
    return await this.distributorsRepository.delete(id);
  }
  async getDistributorById(id: number) {
    return await this.distributorsRepository.findOneById(id);
  }
}
