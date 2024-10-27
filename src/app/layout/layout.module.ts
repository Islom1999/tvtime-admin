import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LayoutRoutingModule } from './layout-roting.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BreadcurmbComponent } from './components/breadcurmb/breadcurmb.component';


@NgModule({
  declarations: [
    LayoutComponent,
    BreadcurmbComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxPermissionsModule,

    // nz zorro
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
  ]
})
export class LayoutModule { }
