import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IMovie, IPagination } from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl = `${environment.apiUrl}/movie`

  _dataSubject = new BehaviorSubject<IMovie[]>([]);
  _data: Observable<IMovie[]> = this._dataSubject.asObservable();

  constructor(private http: HttpClient,) {
    this.loadAllMovie()
  }

  // Movie Load
  loadAllMovie(params?: HttpParams) {
    this.http.get<IMovie[]>(`${this.apiUrl}`, { params })
      .pipe(
        tap(data => this._dataSubject.next(data))
      )
      .subscribe();
  }

  // Movie Get All
  getAllMovie(params?: HttpParams): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiUrl}`, { params });
  }

  // Movie Get All Pagination
  getAllPaninationMovie(params?: HttpParams): Observable<IPagination<IMovie[]>> {
    return this.http.get<IPagination<IMovie[]>>(`${this.apiUrl}/pagination`, {
      params,
    });
  }

  // Movie Get One
  getByIdMovie(id: string | undefined): Observable<IMovie> {
    if(!id) return of()
    return this.http.get<IMovie>(`${this.apiUrl}/${id}`);
  }

  // Part Get One
  getByIdPart(id: string | undefined): Observable<IMovie> {
    if(!id) return of()
    return this.http.get<IMovie>(`${this.apiUrl}/serial-part/${id}`);
  }

  // Movie Create
  createMovie(data: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.loadAllMovie()
      })
    );
  }

  // Serial Create
  createSerial(data: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(`${this.apiUrl}/serial`, data).pipe(
      tap(() => {
        this.loadAllMovie()
      })
    );
  }

  // Part Create
  createPart(data: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(`${this.apiUrl}/serial-part`, data).pipe(
      tap(() => {
        this.loadAllMovie()
      })
    );
  }

  // Movie Update
  updateMovie(id: string, data: IMovie): Observable<IMovie> {
    return this.http.put<IMovie>(`${this.apiUrl}/${id}`, data).pipe(
      tap(() => {
        this.loadAllMovie()
      }),
    );
  }

  // Serial Update
  updateSerial(id: string, data: IMovie): Observable<IMovie> {
    return this.http.put<IMovie>(`${this.apiUrl}/serial/${id}`, data).pipe(
      tap(() => {
        this.loadAllMovie()
      }),
    );
  }

  // Part Update
  updatePart(id: string, data: IMovie): Observable<IMovie> {
    return this.http.put<IMovie>(`${this.apiUrl}/serial-part/${id}`, data).pipe(
      tap(() => {
        this.loadAllMovie()
      }),
    );
  }

  // All
  delete(id: string): Observable<IMovie> {
    return this.http.delete<IMovie>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadAllMovie()
      }),
    );
  }
}
