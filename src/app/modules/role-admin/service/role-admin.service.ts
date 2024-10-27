import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IRole } from '../../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminService extends BaseApiService<IRole> {

  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/role-admin`)
  }
}
