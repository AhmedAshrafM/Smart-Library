import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
    constructor(
        private loggerService: LoggerService
    ){}
    @Get()
    getLogs(){
        return this.loggerService.fetchLog()
    }
}
