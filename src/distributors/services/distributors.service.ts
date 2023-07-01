import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { createDistributorDto } from 'src/distributors/dtos/createDistributor.to';
import { Audit } from 'src/typeorm/entities/Audit';
import { Distributor } from 'src/typeorm/entities/Distributor';
import { checkIfDataExists } from 'src/utils/checkIfDataExists.utils';
import { Repository } from 'typeorm';

@Injectable()
export class DistributorsService {
  constructor(
    @InjectRepository(Distributor) private distributorsRepository: Repository<Distributor>,
    @InjectRepository(Audit) private loggerRepository: Repository<Audit>,
  ) {}

  fetchDistributors() {
    return this.distributorsRepository.find();
  }

  async createDistributor(distributorDetails: createDistributorDto) {
    await checkIfDataExists(this.distributorsRepository, 'distributorName', distributorDetails.distributorName);
    let newDistributor = this.distributorsRepository.create({
      ...distributorDetails,
    });

    const newLog: Audit = entityToLog('New Distributor', newDistributor, 'Distributors');
    await this.loggerRepository.save(newLog);

    return this.distributorsRepository.save(newDistributor);
  }

  async updateDistributorById(id: number, distributorDetails: createDistributorDto) {
    const distributor = await this.distributorsRepository.findOneById(id);

    if (!distributor) {
      throw new NotFoundException('Distributor not found');
    }

    return await this.distributorsRepository.update(id, { ...distributorDetails });
  }

  async deleteDistributorById(id: number) {
    const distributor = await this.distributorsRepository.findOneById(id);

    if (!distributor) {
      throw new NotFoundException('Distributor not found');
    }

    return await this.distributorsRepository.delete(id);
  }

  async getDistributorById(id: number) {
    const distributor = await this.distributorsRepository.findOneById(id);

    if (!distributor) {
      throw new NotFoundException('Distributor not found');
    }

    return distributor;
  }
}
