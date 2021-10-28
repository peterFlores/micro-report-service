import { Controller, Get } from '@nestjs/common';
import { Report } from './reports.model';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {}

    @Get()
    async reports(): Promise<Report> {
        return await this.reportService.fetchReports();
    }

}
