import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideosService } from '../../service/videos.service';
import { IVideo } from '../../../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-videos-info',
  templateUrl: './videos-info.component.html',
  styleUrl: './videos-info.component.scss'
})
export class VideosInfoComponent implements OnInit {
  video$!: Observable<IVideo>;
  baseUrl = environment.apiUrl;
  selectedFormat: number = 0;
  startTime: number = 0;
  videoData!: IVideo;

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _videoSrv: VideosService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.video$ = this._videoSrv.getById(this.id);
    this.video$.subscribe(video => {
      this.videoData = video;
      // this.selectedFormat = video.format[0]; // Set initial format to the first format available
      this.selectedFormat = 0; // Set initial format to the first format available
      this.updateVideoSrc(); // Update the video source when the data is loaded
    });
  }

  onFormatChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedFormat = +target.value;
    this.updateVideoSrc();
  }

  onTimeUpdate(event: Event): void {
    const video = event.target as HTMLVideoElement;
    this.startTime = video.currentTime;
  }

  updateVideoSrc(): void {
    const videoElement = this.videoPlayer?.nativeElement;
    if (videoElement && this.videoData) {
      videoElement.src = `${this.baseUrl}/video-stream/watch/${this.videoData.file_name}?resolution=${this.selectedFormat}&start=${this.startTime}`;
      videoElement.load();
      videoElement.play();      
    }
  }
}
