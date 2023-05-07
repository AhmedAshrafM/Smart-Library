import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { Publisher } from 'src/typeorm/entities/Publisher';
import { Repository } from 'typeorm';
import { createPublisherDto } from '../dtos/createPublisher.dto';

@Injectable()
export class PublishersService {
    constructor(
        @InjectRepository(Publisher) private publishersRepository: Repository<Publisher>,
        @InjectRepository(Audit) private loggerRepo: Repository<Audit>
    ){}
    fetchPublishers() {
        return this.publishersRepository.find();
      }
    async createPublisher(publishersDetails: createPublisherDto){
        let newPublisher = this.publishersRepository.create({...publishersDetails});
        let newLog: Audit = entityToLog("New Publisher",newPublisher,"Publishers")
    this.loggerRepo.save(newLog)
        return this.publishersRepository.save(newPublisher);
    }
    async updatePublisherById(id: number, publishersDetails: createPublisherDto) {
        return await this.publishersRepository.update(id, { ...publishersDetails });
      }
      async getPublisherById(id: number) {
        return await this.publishersRepository.findOneById(id);
      }
      async deletePublisherById(id: number) {
        return await this.publishersRepository.delete(id);
      }
}
