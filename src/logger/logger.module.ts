import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from 'src/typeorm/entities/Audit';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
    imports: [TypeOrmModule.forFeature([Audit])],
    controllers: [LoggerController],
    providers: [LoggerService],
})
export class LoggerModule {
    
}
