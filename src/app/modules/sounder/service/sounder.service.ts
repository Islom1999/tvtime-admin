import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { ISounder } from '../../../../interfaces/sounder';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SounderService extends BaseApiService<ISounder> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/sounder`)
  }
}
