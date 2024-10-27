import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IMovieGenre } from '../../../../interfaces/movie_genre';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieGenreService extends BaseApiService<IMovieGenre> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/movie-genre`)
  }
}
