import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AiClientAppService {
    constructor(private readonly httpService: HttpService){} 
      async borrow(id: number): Promise<any> {
        const { data } = await firstValueFrom(
          this.httpService.post<any>('http://127.0.0.1:5000/get_books', {"user_id" : id
        }).pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
        );
        return data;
      }
}
