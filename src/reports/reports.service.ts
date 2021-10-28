import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { ClientService } from './client.service';
import { Report } from './reports.model';
import Reservation from './reservation.model';

@Injectable()
export class ReportsService {
    constructor(private clientService: ClientService,  @InjectRepository(Reservation)
    private repository: Repository<Reservation>) {}

    async fetchReports() {
        const clients = await this.clientService.findClients();
        const clientValue = await lastValueFrom(clients);
        const reports: Report = {
            newUsers: clientValue.length,
            totalReservations: await this.fetchTotalReservations() || 0,
            totalPayedReservations: await this.fetchTotalPayedReservations() || 0,
            totalBalance: await this.fetchTotalBalance() || 0,
            totalReservationsPerMonth: await this.reservationsPerMonth() || [],
            totalBalancePerMonth: await this.TotalPerMonth() || []
        }
        return reports;
    }

    async fetchTotalReservations () {
        let value = await this.repository.createQueryBuilder('reservation').select('*').getCount();
        return value;
    }

    async fetchTotalPayedReservations () {
        let value = await this.repository.createQueryBuilder('reservation')
            .select('*').where("status IN (:status)", {status: ['CONFIRM', 'CHECK-IN', 'CHECK-OUT']}).getCount();
        return value;
    }

    async fetchTotalBalance() {
        let value = await this.repository.createQueryBuilder('reservation')
            .select('round(SUM(TOTAL),2)','total').where("status IN (:status)", {status: ['CONFIRM', 'CHECK-IN', 'CHECK-OUT']}).getRawOne();
        console.log(value.total);
        return Number.parseInt(value.total);
    }

    async reservationsPerMonth() {
        let value = await this.repository.query(`SELECT
        monthname(t.created_at) as 'date',
        COUNT(*) as 'count'
    FROM hostal.reservation t
    GROUP BY MONTH(t.created_at)
    ORDER BY 'date' DESC`);
        return value;
    }

    async TotalPerMonth() {
        let value = await this.repository.query(`SELECT
        monthname(t.created_at) as 'date',
        SUM(total) as 'total'
    FROM hostal.reservation t
    GROUP BY MONTH(created_at)
    ORDER BY 'date' DESC`);
        return value;
    }

}
