import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/roles/role.decorator';
import Role from 'src/roles/role.enum';
import { createReservationDTO } from '../dtos/createReservationDTO';
import { ReservationFilters } from '../dtos/resultDTO.dto';
import { updateReservationDTO } from '../dtos/updateReservationDTO.dto';
import { ReservationsService } from '../services/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('getReservations')
  async getReservations(@Query() filters?: ReservationFilters) {
    try {
      const reservations = await this.reservationService.fetchReservations(filters);
      return reservations;
    } catch (error) {
      throw new NotFoundException('Failed to fetch reservations.');
    }
  }
  


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getReservationById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.reservationService.getReservationById(id);
    } catch (error) {
      throw new NotFoundException('Failed to get reservation, ID not found.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('/user/:id')
  async getReservationsByUserId(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.reservationService.getReservationByUserId(id);
    } catch (error) {
      throw new NotFoundException(
        'Failed to get reservations, user ID not found.',
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Post()
  async createReservation(@Body() body: createReservationDTO) {
    try {
      return this.reservationService.createReservation(body);
    } catch (error) {
      throw new ConflictException('Failed to create reservation.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: updateReservationDTO,
  ) {
    try {
      await this.reservationService.updateReservation(id, updateReservationDto);
    } catch (error) {
      throw new NotFoundException('Failed to update reservation.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteReservationById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.reservationService.deleteReservation(id);
    } catch (error) {
      throw new NotFoundException('Failed to delete reservation, ID not found.');
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.SuperAdmin)
@Get('/report/ReportGenerator')
async getReportGenerator(@Query() filters?: ReservationFilters) {
  try {
    const reservations = await this.reservationService.reportGeneration(filters);
    return reservations;
  } catch (error) {
    throw new NotFoundException('Failed to fetch reservations.');
  }
}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('/report/overdue')
  async getOverDueReport() {
    try {
      return await this.reservationService.getOverDueBooks();
    } catch (error) {
      throw new NotFoundException('Failed to get overdue report.');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('/report/Genres')
  async getMostBorrowedGenres() {
    try {
      return await this.reservationService.getMostBorrowedGenres();
    } catch (error) {
      throw new NotFoundException('Failed to get most borrowed genres report.');
    }
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('/report/MostBorrowedBooks')
  async getMostBorrowedBooks() {
    try{
      return await this.reservationService.getMostBorrowedBooks();
    }catch (error){
      console.log(error);
      
      throw new NotFoundException('Failed to get most borrowed books report.');
    }
}
}