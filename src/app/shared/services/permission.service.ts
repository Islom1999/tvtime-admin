import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permission } from '../../../enumerations';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = `${environment.apiUrl}/user-admin`;

  constructor(private http: HttpClient) {}
  
  getPermisssion(): Observable<Permission[]> {
    const url = `${this.apiUrl}/permission`;
    return this.http.get<Permission[]>(url);
  }
}
