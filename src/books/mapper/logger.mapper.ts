import { Book } from 'src/typeorm/entities/Book';
import { Audit } from 'src/typeorm/entities/Audit';
import { CreateLogParams } from 'src/utils/types';
import { createBookDto } from '../dtos/createBook.dto';

export const entityToLog = (type: string, entity: any, name: string): Audit => {
    
  let log: Audit = new Audit();
  log.type = type;
  log.body = entity;
  log.entity = name;
  return log;
};
