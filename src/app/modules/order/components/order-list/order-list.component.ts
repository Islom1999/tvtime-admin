import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IOrder } from '../../../../../interfaces/order';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { OrderService } from '../../service/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { PaymentProvider } from '../../../../../enumerations';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent extends BaseComponentList<IOrder> {
  orders$: Observable<IOrder[]> = of([]);

  date_start: string = (new Date(new Date().setDate((new Date()).getDate() - 30))).toISOString().split('T')[0]
  date_end: string = (new Date().toISOString().split('T')[0])
  date = [this.date_start, this.date_end]

  // Serch variables
  searchValue = '';
  visible = false;

  searchValueType = '';
  visibleType = false;

  searchValueUser = '';
  visibleUser = false;

  paymentType: PaymentProvider[] = Object.values(PaymentProvider);

  override breadcrumb: Breadcrumb = {
    header: "Orderlar", 
    label: "Orderlar ro'yhati", 
    url: '/order-order'
  };

  constructor(
    private _baseSrv: OrderService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
    private drawerService: NzDrawerService,
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.load()

    this.orders$ = this.data$
  }

  open(id:string): void {
    this.drawerService.create<OrderDetailComponent, { id: string }, string>({
      nzTitle: 'Order premium ma\'lumotlari',
      nzContent: OrderDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }

  onChange(result: Date[]): void {
    if(result[0] && result[1]){
      this.date_start = result[0].toISOString().split('T')[0];
      this.date_end = result[1].toISOString().split('T')[0];
      this.load()
    }else{
      let params:HttpParams = new HttpParams()
      this._baseSrv.updateParams(params)
    }
  }

  load(){
    let params:HttpParams = new HttpParams()
    params = params.set('date_start', this.date_start)
    params = params.set('date_end', this.date_end)
    this._baseSrv.updateParams(params)
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.orders$ = this.orders$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.tid
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  resetType(): void {
    this.searchValueType = '';
    this.search();
  }

  // Search function
  searchType(): void {
    this.visibleType = false;
    this.orders$ = this.orders$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) => {
            return order?.transactions[0]?.provider 
                .toString()
                .toLocaleLowerCase()
                .includes(this.searchValueType.toLocaleLowerCase())
            }
          )
        )
      )
    );
  }

  resetUser(): void {
    this.searchValueUser = '';
    this.searchUser();
  }

  // Search function
  searchUser(): void {
    this.visibleUser = false;
    this.orders$ = this.orders$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) => {
            const name = order?.user?.name 
              .toString()
              .toLocaleLowerCase()
              .includes(this.searchValueUser.toLocaleLowerCase())

            const id = order?.user?.id!
              .toString()
              .includes(this.searchValueUser)
            return (name || id)
            }
          )
        )
      )
    );
  }

  
}
