import { Injectable } from '@nestjs/common';
import { ViewEntity } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
}



