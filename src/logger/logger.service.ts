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
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get()
    fetchLog() {
        return this.loggerRepo.find();
      }
}
