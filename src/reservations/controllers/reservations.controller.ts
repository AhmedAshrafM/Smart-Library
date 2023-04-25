import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { createReservationDTO } from '../dtos/createReservationDTO';
import { updateReservationDTO } from '../dtos/updateReservationDTO.dto';
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
    @Roles(Role.User,Role.Admin,Role.SuperAdmin)
    @Post()
    createReservation(@Body() body: createReservationDTO){
        this.reservationService.createReservation(body);
    }
    @Put(':id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: updateReservationDTO ,
  ) {
   await this.reservationService.updateReservation(id,updateReservationDto);
  }
}
