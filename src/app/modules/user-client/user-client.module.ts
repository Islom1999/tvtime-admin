import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClientListComponent } from './components/user-client-list/user-client-list.component';
import { UserClientDetailComponent } from './components/user-client-detail/user-client-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from '../order/components/order-list/order-list.component';
import { OrderDetailComponent } from '../order/components/order-detail/order-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const routes: Routes = [
  {
    path: '',
    component: UserClientListComponent
  },
  {
    path: 'update/:id',
    component: UserClientDetailComponent
  }
];

@NgModule({
  declarations: [
    UserClientListComponent,
    UserClientDetailComponent
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
  ]
})
export class UserClientModule { }
