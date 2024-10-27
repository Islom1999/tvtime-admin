import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IUser } from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserClientService extends BaseApiService<IUser> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/user`)
  }
}
