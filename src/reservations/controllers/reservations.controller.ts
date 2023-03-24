import { Body, Controller, Get, Post } from '@nestjs/common';
import { createReservationDTO } from '../dtos/createReservationDTO';
import { ReservationsService } from '../services/reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private reservationService: ReservationsService
    ){}
    
    @Get()
    getReservations(){
        return this.reservationService.fetchReservations();
    }
    @Post()
    createReservation(@Body() body: createReservationDTO){
        this.reservationService.createReservation(body);
    }
}
