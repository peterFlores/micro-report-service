import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Reservation from './reports/reservation.model';
import ReservationDTO from './reports/reservationDTO.model';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '137.135.92.123',
    port: 3306,
    username: 'hostal',
    password: 'Hostal2021@',
    database: 'hostal',
    dropSchema: false,
    entities: [Reservation, ReservationDTO],
    synchronize: true
  }),
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
