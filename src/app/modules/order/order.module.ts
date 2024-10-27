import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: 'view',
    component: OrderDetailComponent
  },
];

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,

    NzModalModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzTagModule,
  ]
})
export class OrderModule { }
