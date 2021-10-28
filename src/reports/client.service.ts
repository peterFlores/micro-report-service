import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ClientService {
    constructor(private httpService: HttpService) {}

    findClients(): Observable<any[]> {
        const url = 'http://137.135.92.123:3001/api/v1/client';
        return this.httpService.get(`${url}`).pipe(
            map(response => response.data)
        );
    }

}
