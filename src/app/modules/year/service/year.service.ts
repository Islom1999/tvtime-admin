import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IYear } from '../../../../interfaces/year';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YearService extends BaseApiService<IYear> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/year`)
  }
}
