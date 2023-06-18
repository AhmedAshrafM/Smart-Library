import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
    constructor(
        private loggerService: LoggerService
    ){}
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.SuperAdmin)
    @Get()
    getLogs(){
        return this.loggerService.fetchLog()
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.SuperAdmin,Role.Admin)
    @Get('/report/UserActivity')
    getUserAcitivty(){
        return this.loggerService.getUserActivity()
    }
}
