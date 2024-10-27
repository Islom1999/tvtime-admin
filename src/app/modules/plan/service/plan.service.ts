import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IPlan } from '../../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseApiService<IPlan> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/plan`)
  }
}
