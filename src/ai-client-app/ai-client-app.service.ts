import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AiClientAppService {
    constructor(private readonly httpService: HttpService){} 
      async borrow(id: number, algorithm: string): Promise<any> {
        const { data } = await firstValueFrom(
          this.httpService.post<any>('http://127.0.0.1:8080/get_books', {"user_id" : id,"algorithm": algorithm
        }).pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
        );
        return data;
      }
      async updateAlgorithm(algorithmId: number): Promise<any>{
        const { data } = await firstValueFrom(
          this.httpService.post<any>("http://127.0.0.1:8080/update_config", {"algorithmId": algorithmId})
          .pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
        );

        return data;
      }
}
