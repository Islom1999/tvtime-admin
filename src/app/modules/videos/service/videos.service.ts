import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IVideo } from '../../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService extends BaseApiService<IVideo>{
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/video-stream`)
  }

  uploadVideo(video: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('video', video, video.name);

    const req = new HttpRequest('POST', `${environment.apiUrl}/video-stream/upload`, formData, {
      reportProgress: true
    })

    return this.http.request(req)
  }
}
