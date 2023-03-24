import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStock } from 'src/typeorm/entities/BookStock';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { User } from 'src/typeorm/entities/User';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookStock,User,Reservation])],
  controllers: [ReservationsController],
  providers:[ReservationsService]
})
export class ReservationsModule {}
