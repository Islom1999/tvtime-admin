import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { VideosService } from '../../service/videos.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos-detail',
  templateUrl: './videos-detail.component.html',
  styleUrl: './videos-detail.component.scss'
})
export class VideosDetailComponent {
  uploadProgress: number = 0;
  processingProgress: number = 0;
  uploading: boolean = false;
  processing: boolean = false;

  constructor(
    private videoUploadService: VideosService,
    private msg: NzMessageService,
    private router: Router,
  ) {}

  beforeUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
    const isMp4 = file.type === 'video/mp4';
    if (!isMp4) {
      this.msg.error('Only MP4 files are allowed');
      return false;
    }

    const isLt2G = file.size! / 1024 / 1024 / 1024 < 2;
    if (!isLt2G) {
      this.msg.error('File size must be less than 2GB');
      return false;
    }

    this.handleUpload(file as any as File);  // Convert NzUploadFile to File
    return false;
  };

  handleUpload(file: File): void {
    this.uploading = true;
    this.videoUploadService.uploadVideo(file).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          }
        } else if (event.type === HttpEventType.Response) {
          this.msg.success('Upload successful');
          this.uploading = false;
          this.uploadProgress = 0;

          // Start processing progress
          this.processing = true;
          this.processingProgress = 0;
          this.trackProcessingProgress(file.name);
        }
      },
      error => {
        this.msg.error('Upload failed');
        this.uploading = false;
        this.uploadProgress = 0;
      }
    );
  }

  trackProcessingProgress(videoName: string): void {
    const interval = setInterval(() => {
        this.processingProgress += 20;

        if (this.processingProgress >= 100) {
            clearInterval(interval);
            this.processing = false;
            this.processingProgress = 0;
            this.msg.success('Video processing complete');
        }
    }, 500);

    setTimeout(() => {
      this.router.navigate(['video'])
      this.videoUploadService.loadAll()
    },1000)
  }

  back(){
    this.router.navigate(['video'])
  }
}
