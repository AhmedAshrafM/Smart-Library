import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from 'src/typeorm/entities/Audit';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { User } from 'src/typeorm/entities/User';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookStock,User,Reservation,Audit])],
  controllers: [ReservationsController],
  providers:[ReservationsService]
})
export class ReservationsModule {}
