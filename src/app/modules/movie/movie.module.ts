import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MovieType } from '../../../enumerations';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SerialPartDetailComponent } from './components/serial-part-detail/serial-part-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent
  },
  {
    path: 'add/movie',
    data: {type: MovieType.movie},
    component: MovieDetailComponent
  },
  {
    path: 'add/serial',
    data: {type: MovieType.serial},
    component: MovieDetailComponent
  },
  {
    path: 'update/movie/:id',
    data: {type: MovieType.movie},
    component: MovieDetailComponent
  },
  {
    path: 'update/serial/:id',
    data: {type: MovieType.serial},
    component: MovieDetailComponent
  },
];

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieInfoComponent,
    SerialPartDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    CKEditorModule,

    NzUploadModule,
    NzModalModule,
    NzDrawerModule,
  ]
})
export class MovieModule { }
