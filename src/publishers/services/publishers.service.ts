import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from 'src/typeorm/entities/Publisher';
import { Repository } from 'typeorm';
import { createPublisherDto } from '../dtos/createPublisher.dto';

@Injectable()
export class PublishersService {
    constructor(
        @InjectRepository(Publisher) private publishersRepository: Repository<Publisher>
    ){}
    fetchPublishers() {
        return this.publishersRepository.find();
      }
    async createPublisher(publishersDetails: createPublisherDto){
        let newPublisher = this.publishersRepository.create({...publishersDetails});
        return this.publishersRepository.save(newPublisher);
    }
}
