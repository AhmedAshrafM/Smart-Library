import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
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
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.SuperAdmin)
    @Get()
    getReservations(){
        return this.reservationService.fetchReservations();
    }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getReservationById(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.getReservationById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin, Role.SuperAdmin)
  @Get('/user/:id')
  async getReservationsByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.getReservationByUserId(id);
  }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.User,Role.Admin,Role.SuperAdmin)
    @Post()
    createReservation(@Body() body: createReservationDTO){
        this.reservationService.createReservation(body);
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.SuperAdmin)
    @Put(':id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: updateReservationDTO ,
  ) {
   await this.reservationService.updateReservation(id,updateReservationDto);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.SuperAdmin)
  @Delete(':id')
  async deleteReservationById(
    @Param('id', ParseIntPipe) id: number) {
   await this.reservationService.deleteReservation(id);
  }
}
