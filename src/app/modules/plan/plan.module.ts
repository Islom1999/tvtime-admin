import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanDetailComponent } from './components/plan-detail/plan-detail.component';
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';

const routes: Routes = [
  {
    path: '',
    component: PlanListComponent
  },
  {
    path: 'add',
    component: PlanDetailComponent
  },
  {
    path: 'update/:id',
    component: PlanDetailComponent
  },
];

@NgModule({
  declarations: [
    PlanDetailComponent,
    PlanListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
  ]
})
export class PlanModule { }
