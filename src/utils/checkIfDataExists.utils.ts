import { BadRequestException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

export async function checkIfDataExists(repository: Repository<any>, field: string, value: any) {
  const existingData = await repository.findOne({ where: { [field]: value } });
  if (existingData) {
    throw new ConflictException(`Data with ${field} '${value}' already exists.`);
  }
}
