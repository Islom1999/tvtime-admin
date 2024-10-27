import { Component, Injectable, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { Observable, Subscription, catchError, filter, of, tap } from 'rxjs';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { ImageService } from '../../../../shared/services/image.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MovieType, Quality, StatusType } from '../../../../../enumerations';
import { ICountry } from '../../../../../interfaces/country';
import { CountryService } from '../../../country/service/country.service';
import { IYear } from '../../../../../interfaces/year';
import { ISounder } from '../../../../../interfaces/sounder';
import { ICategory } from '../../../../../interfaces/category';
import { IMovieGenre } from '../../../../../interfaces/movie_genre';
import { YearService } from '../../../year/service/year.service';
import { CategoryService } from '../../../category/service/category.service';
import { SounderService } from '../../../sounder/service/sounder.service';
import { MovieGenreService } from '../../../movie-genre/service/movie-genre.service';
import { VideosService } from '../../../videos/service/videos.service';
import { IMovie, IVideo } from '../../../../../interfaces';

export interface IUploadRes{
  url: string
  filename: string
}

const getBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  public Editor = ClassicEditor;
  movie!: IMovie

  quality: Quality[] = Object.values(Quality);
  status_type: StatusType[] = Object.values(StatusType);
  movie_type!: MovieType
  movie_type_serial = MovieType.serial

  country$!:Observable<ICountry[]>
  year$!:Observable<IYear[]>
  sounder$!:Observable<ISounder[]>
  category$!:Observable<ICategory[]>
  movie_genre$!:Observable<IMovieGenre[]>
  video$!:Observable<IVideo[]>

  listOfSelectedSounder: string[] = []
  listOfSelectedCategory: string[] = []
  listOfSelectedMovieGenre: string[] = []

  uploadURL = `${environment.apiUrl}/image/upload`
  // uploadURL = `https://api.tvtime.uz/api/image/upload`
  
  loading = true;
  disableBtn = true;

  // Image  start
  previewImage: string | undefined = '';
  previewImageFrame: string | undefined = '';

  previewVisible = false;
  previewVisibleFrame = false;

  fileListImages: NzUploadFile[] = []
  fileListImagesFrame: NzUploadFile[] = []

  // images
  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  customUpload = (item: NzUploadXHRArgs): Subscription => {
    if (item) {
      const formData = new FormData();
      formData.append('image', item.file as any);
    
      return this._http.post<IUploadRes>(this.uploadURL, formData).subscribe(
        (response) => {
          if (item.onSuccess) {
            item.onSuccess(response, item.file, event);
          }
        },
        (error) => {
          if (item.onError) {
            item.onError(error, item.file);
          }
        }
      );
    } else {
      return new Subscription(); // Yoki istalgan boshqa Subscription obyekti
    }
  }

  removeImage(file: NzUploadFile) {
    return true
  }

  getImageAllImages(): string[]{
    return this.fileListImages.map((item) => item.response.filename)
  }
  
  // frame images
  handlePreviewFrame = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImageFrame = file.url || file['preview'];
    this.previewVisibleFrame = true;
  };


  customUploadFrame = (item: NzUploadXHRArgs): Subscription => {
    if (item) {
      const formData = new FormData();
      formData.append('image', item.file as any);
    
      return this._http.post<IUploadRes>(this.uploadURL, formData).subscribe(
        (response) => {
          if (item.onSuccess) {
            item.onSuccess(response, item.file, event);
          }
        },
        (error) => {
          if (item.onError) {
            item.onError(error, item.file);
          }
        }
      );
    } else {
      return new Subscription(); // Yoki istalgan boshqa Subscription obyekti
    }
  }

  removeImageFrame(file: NzUploadFile) {
    return true
  }

  getImageAllImagesFrame(): string[]{    
    return this.fileListImagesFrame.map((item) => item.response.filename)
  }

  // Image end

  // Image end

  breadcrumb: Breadcrumb = {
    header: "Movie", 
    label: "Movie ro'yhati", 
    url: '/movie'
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _modelSrv: MovieService,
    private _videoSrv: VideosService,
    private _countrySrv: CountryService,
    private _yearSrv: YearService,
    private _categorySrv: CategoryService,
    private _sounderSrv: SounderService,
    private _movieGenreSrv: MovieGenreService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    protected breadcrumbService: BreadcrumbsService,
    private imageSrv: ImageService,
    private _http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      { 
        header:this.breadcrumb.header,
        label:this.breadcrumb.label, 
        url: this.breadcrumb.url
      },
    ]);

    this.movie_type = this.route.snapshot.data['type'];
    
    if (this.id) {
      this._modelSrv.getByIdMovie(this.id).subscribe((movie) => {
        this.movie = movie
        this.form.patchValue({
          ...movie, 
          categoryId: movie?.category?.map(item => item.id),
          sounderId: movie?.sounder?.map(item => item.id),
          movieGenreId: movie?.movie_genre?.map(item => item.id),
        });
        this.fileListImages = movie.images.map((item, index) => {
          return {
            uid: `-${index+1}`,
            name: item,
            status: 'done',
            url: `${environment.apiUrl}/image/${item}`,
            response: {
              filename: item,
              url: `${environment.apiUrl}/image/${item}`,
            }
          }
        })
        this.fileListImagesFrame = movie.frame_images.map((item, index) => {
          return {
            uid: `-${index+1}`,
            name: item,
            status: 'done',
            url: `${environment.apiUrl}/image/${item}`,
            response: {
              filename: item,
              url: `${environment.apiUrl}/image/${item}`,
            }
          }
        })
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }

    this.form = new FormGroup({
      // video: new FormControl('', [(this.movie_type != MovieType.serial) ? Validators.required : Validators.minLength(0)]),
      

      // treyler: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      // quality: new FormControl(Quality.hd_720, [Validators.required]),
      min_age: new FormControl(18, [Validators.required, Validators.min(0), Validators.max(100)]),
      language: new FormControl("O'zbek", [Validators.required]),
      status_type: new FormControl(StatusType.free, [Validators.required]),
      is_slider: new FormControl(false, [Validators.required]),

      country_id: new FormControl('', [Validators.required]),
      year_id: new FormControl('', [Validators.required]),
      
      sounderId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      movieGenreId: new FormControl('', [Validators.required]),

      video_id: new FormControl('', [Validators.required]),
      duration: new FormControl(0, [Validators.required, Validators.min(0)])
    });
    
    if (this.movie_type == MovieType.serial) {
      this.form.removeControl('video_id');
      this.form.removeControl('duration');
    }
    

    this.country$ = this._countrySrv.getAll()
    this.year$ = this._yearSrv.getAll()
    this.category$ = this._categorySrv.getAll()
    this.movie_genre$ = this._movieGenreSrv.getAll()
    this.sounder$ = this._sounderSrv.getAll()
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
    if(this.movie_type == MovieType.movie){
      this._modelSrv
        .createMovie({
          ...this.form.value, 
          images: this.getImageAllImages(), 
          frame_images: this.getImageAllImagesFrame(),
        })
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
          this.router.navigate(['/', 'movie']);
        });
    }else{
      delete this.form.value.duration
      delete this.form.value.video
      this._modelSrv
        .createSerial({
          ...this.form.value, 
          images: this.getImageAllImages(), 
          frame_images: this.getImageAllImagesFrame()
        })
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
          this.router.navigate(['/', 'movie']);
        });
    }
  }

  update(id: string) {
    if(this.movie_type == MovieType.movie){
      this._modelSrv
        .updateMovie(id, {
          ...this.form.value, 
          images: this.getImageAllImages(), 
          frame_images: this.getImageAllImagesFrame()
        })
        .pipe(
          catchError(({ error }) => {
            if (error?.statusCode == 409)
              this.nzMessageService.error(error?.message);
            // this.disableBtn = false;
            return of();
          })
        )
        .subscribe(() => {
          this.nzMessageService.success('Update data');
          this.router.navigate(['/', 'movie']);
        });
    }else{
      delete this.form.value.duration
      delete this.form.value.video
      this._modelSrv
        .updateSerial(id, {
          ...this.form.value, 
          images: this.getImageAllImages(), 
          frame_images: this.getImageAllImagesFrame()
        })
        .pipe(
          catchError(({ error }) => {
            if (error?.statusCode == 409)
              this.nzMessageService.error(error?.message);
            // this.disableBtn = false;
            return of();
          })
        )
        .subscribe(() => {
          this.nzMessageService.success('Update data');
          this.router.navigate(['/', 'movie']);
        });
    }
  }
}
