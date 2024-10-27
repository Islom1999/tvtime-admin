import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { ICategory } from '../../../../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseApiService<ICategory> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/category`)
  }
}
