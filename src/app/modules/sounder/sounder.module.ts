import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SounderListComponent } from './components/sounder-list/sounder-list.component';
import { SounderDetailComponent } from './components/sounder-detail/sounder-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';

const routes: Routes = [
  {
    path: '',
    component: SounderListComponent
  },
  {
    path: 'add',
    component: SounderDetailComponent
  },
  {
    path: 'update/:id',
    component: SounderDetailComponent
  },
];

@NgModule({
  declarations: [
    SounderListComponent,
    SounderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
  ]
})
export class SounderModule { }
