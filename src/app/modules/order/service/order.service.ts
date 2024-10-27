import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IOrder } from '../../../../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseApiService<IOrder> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/order`)
  }
}
