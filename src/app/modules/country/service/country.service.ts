import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { ICountry } from '../../../../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseApiService<ICountry> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/country`)
  }
}
