import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { VideosDetailComponent } from './components/videos-detail/videos-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from '../../shared/modules';
import { VideosInfoComponent } from './components/videos-info/videos-info.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzProgressModule } from 'ng-zorro-antd/progress';

const routes: Routes = [
  {
    path: '',
    component: VideosListComponent
  },
  {
    path: 'add',
    component: VideosDetailComponent
  },
  {
    path: 'info/:id',
    component: VideosInfoComponent
  }
];

@NgModule({
  declarations: [
    VideosListComponent,
    VideosDetailComponent,
    VideosInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,

    NzUploadModule,
    NzProgressModule
  ]
})
export class VideosModule { }
