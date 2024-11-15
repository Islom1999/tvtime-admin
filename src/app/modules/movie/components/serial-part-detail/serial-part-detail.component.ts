import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { Observable, catchError, of } from 'rxjs';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { VideosService } from '../../../videos/service/videos.service';
import { IMovie, IVideo } from '../../../../../interfaces';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MovieType } from '../../../../../enumerations';

@Component({
  selector: 'app-serial-part-detail',
  templateUrl: './serial-part-detail.component.html',
  styleUrl: './serial-part-detail.component.scss'
})
export class SerialPartDetailComponent implements OnInit {
  @Input()
  id!:string
  @Input()
  parent_id!:string

  movie!: IMovie
  
  loading = true;
  disableBtn = true;
  video$!:Observable<IVideo[]>

  form: FormGroup = new FormGroup({});

  constructor(
    private _modelSrv: MovieService,
    private _videoSrv: VideosService,
    private nzMessageService: NzMessageService,
    protected breadcrumbService: BreadcrumbsService,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      video: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
    if (this.id) {
      this._modelSrv.getByIdPart(this.id).subscribe((movie) => {
        this.movie = movie
        this.form.patchValue(movie);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }
    this.video$ = this._videoSrv.getAll()
  }

  submit() {
    if (this.form.valid) {
      this.disableBtn = true;
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
      }
      this._videoSrv.loadAll()
      this.open(this.parent_id, MovieType.serial)
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create() {
    this._modelSrv
      .createPart({...this.form.value, movie_id: this.parent_id})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
    });
    this.drawerRef.close()
  }

  update(id: string) {
    this._modelSrv
      .updatePart(id, {...this.form.value, movie_id: this.parent_id})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
    });
    this.drawerRef.close()
  }

  close() {
    this.drawerRef.close()
  }

  open(id:string, movie_type:MovieType): void {
    this.drawerService.create<MovieInfoComponent, { id: string, movie_type:MovieType }, string>({
      nzTitle: 'Movie ma\'lumotlari',
      nzContent: MovieInfoComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
        movie_type
      }
    });
    this.close()
  }
}
