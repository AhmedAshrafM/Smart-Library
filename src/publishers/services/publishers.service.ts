import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToLog } from 'src/books/mapper/logger.mapper';
import { Audit } from 'src/typeorm/entities/Audit';
import { Publisher } from 'src/typeorm/entities/Publisher';
import { checkIfDataExists } from 'src/utils/checkIfDataExists.utils';
import { Repository } from 'typeorm';
import { createPublisherDto } from '../dtos/createPublisher.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher) private publishersRepository: Repository<Publisher>,
    @InjectRepository(Audit) private loggerRepository: Repository<Audit>
  ) {}

  fetchPublishers() {
    return this.publishersRepository.find();
  }

  async createPublisher(publishersDetails: createPublisherDto) {
    await checkIfDataExists (this.publishersRepository, 'publisherName', publishersDetails.publisherName);
    let newPublisher = this.publishersRepository.create({ ...publishersDetails });

    const newLog: Audit = entityToLog('New Publisher', newPublisher, 'Publishers');
    this.loggerRepository.save(newLog);

    return this.publishersRepository.save(newPublisher);
  }

  async updatePublisherById(id: number, publishersDetails: createPublisherDto) {
    const publisher = await this.publishersRepository.findOneById(id);

    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }

    return await this.publishersRepository.update(id, { ...publishersDetails });
  }

  async getPublisherById(id: number) {
    const publisher = await this.publishersRepository.findOneById(id);

    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }

    return publisher;
  }

  async deletePublisherById(id: number) {
    const publisher = await this.publishersRepository.findOneById(id);

    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }

    return await this.publishersRepository.delete(id);
  }
}
