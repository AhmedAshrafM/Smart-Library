import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDistributorDto } from 'src/distributors/dtos/createDistributor.to';
import { Distributor } from 'src/typeorm/entities/Distributor';
import { Repository } from 'typeorm';

@Injectable()
export class DistributorsService {
    constructor(
        @InjectRepository(Distributor) private distributorsRepository: Repository<Distributor>
    ){}
    fetchDistributors() {
        return this.distributorsRepository.find();
      }
    async createDistributor(distributorDetails: createDistributorDto){
        let newDistributor = this.distributorsRepository.create({...distributorDetails});
        return this.distributorsRepository.save(newDistributor);
    }
}
