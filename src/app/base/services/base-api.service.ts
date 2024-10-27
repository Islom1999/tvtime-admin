import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IPagination } from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService<T> {
  private _dataSubject = new BehaviorSubject<T[]>([]);
  readonly _data: Observable<T[]> = this._dataSubject.asObservable();
  private _paramsSubject = new BehaviorSubject<HttpParams>(new HttpParams());
  readonly _params: Observable<HttpParams> = this._paramsSubject.asObservable();
  private _loadingSubject = new BehaviorSubject<Boolean>(true);

  constructor(protected http: HttpClient, protected apiUrl: string, protected params?:HttpParams) {
    this.loadAll(params)
  }

  updateParams(params: HttpParams) {
    this._paramsSubject.next(params);
    this.loadAll();
    // console.log(this._paramsSubject.value)
  }

  getParams(): HttpParams {
    return this._paramsSubject.value;
  }

  loadAll(params?: HttpParams) {
    this.http.get<T[]>(`${this.apiUrl}`, { params: this._paramsSubject.value })
      .pipe(
        tap(data => {
          this._dataSubject.next(data);
          this._loadingSubject.next(false);
        })
      )
      .subscribe(); 
  }

  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`, { params: this._paramsSubject.value });
  }

  getAllPanination(params?: HttpParams): Observable<IPagination<T[]>> {
    return this.http.get<IPagination<T[]>>(`${this.apiUrl}/pagination`, {
      params: this._paramsSubject.value,
    });
  }

  getById(id: string | undefined): Observable<T> {
    if(!id) return of()
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.loadAll(this.params)
      })
    );
  }

  update(id: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, data).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadAll(this.params)
      }),
    );
  }
}
