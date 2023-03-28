import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
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
    @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin || Role.SuperAdmin)
    @Post()
    createReservation(@Body() body: createReservationDTO){
        this.reservationService.createReservation(body);
    }
}
