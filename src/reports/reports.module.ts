import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import Reservation from './reservation.model';
import ReservationDTO from './reservationDTO.model';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Reservation, ReservationDTO])
  ],
  providers: [ReportsService, ClientService],
  controllers: [ReportsController]
})
export class ReportsModule {}
