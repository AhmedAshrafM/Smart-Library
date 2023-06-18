import { Get, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { Audit } from 'src/typeorm/entities/Audit';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {
    constructor(
        @InjectRepository(Audit) private loggerRepo: Repository<Audit>
    ){}
    async fetchLog() {
        return await this.loggerRepo.find();
      }
    
   async getUserActivity(){
        return await this.loggerRepo.createQueryBuilder().select().where(
            "audit.type = 'New Reservation' OR audit.type = 'New User'"
        ).getMany()
    }
}
