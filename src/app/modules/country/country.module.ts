import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent
  },
  {
    path: 'add',
    component: CountryDetailComponent
  },
  {
    path: 'update/:id',
    component: CountryDetailComponent
  },
];

@NgModule({
  declarations: [
    CountryDetailComponent,
    CountryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
  ]
})
export class CountryModule { }
