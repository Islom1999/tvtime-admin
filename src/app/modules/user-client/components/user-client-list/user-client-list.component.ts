import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IUser } from '../../../../../interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { UserClientService } from '../../service/user-client.service';
import { UserClientDetailComponent } from '../user-client-detail/user-client-detail.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { StatusType } from '../../../../../enumerations';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-client-list',
  templateUrl: './user-client-list.component.html',
  styleUrl: './user-client-list.component.scss'
})
export class UserClientListComponent extends BaseComponentList<IUser> {
  users$: Observable<IUser[]> = of([]);
  statusType: StatusType[] = Object.values(StatusType);

  // Serch variables
  searchValue = '';
  searchValueEmail = '';
  searchValuePhone = '';
  searchValueType = '';
  visible = false;
  visibleEmail = false;
  visiblePhone = false;
  visibleType = false;

  date_start: string = (new Date(new Date().setDate((new Date()).getDate() - 30))).toISOString().split('T')[0]
  date_end: string = (new Date().toISOString().split('T')[0])
  date = [this.date_start, this.date_end]

  override breadcrumb: Breadcrumb = {
    header: "Userlar", 
    label: "Userlar ro'yhati", 
    url: '/user-user'
  };

  constructor(
    private _baseSrv: UserClientService,
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
    this.users$ = this.data$;
  }

  open(id:string): void {
    this.drawerService.create<UserClientDetailComponent, { id: string }, string>({
      nzTitle: 'User premium ma\'lumotlari',
      nzContent: UserClientDetailComponent,
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
    this.users$ = this.users$.pipe(
      switchMap((item) =>
        of(
          item.filter((user) =>
            user?.name ?
            user.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase()) : false
          )
        )
      )
    );
  }

  resetEmail(): void {
    this.searchValueEmail = '';
    this.searchEmail();
  }

  // Search function
  searchEmail(): void {
    this.visibleEmail = false;
    this.users$ = this.users$.pipe(
      switchMap((item) =>
        of(
          item.filter((user) =>
            user?.email ?
            user.email
              .toLocaleLowerCase()
              .includes(this.searchValueEmail.toLocaleLowerCase()) : false
          )
        )
      )
    );
  }

  resetPhone(): void {
    this.searchValuePhone = '';
    this.searchPhone();
  }

  // Search function
  searchPhone(): void {
    this.visiblePhone = false;
    this.users$ = this.users$.pipe(
      switchMap((item) =>
        of(
          item.filter((user) =>
            user?.phone ?
            user.phone
              .toString()
              .toLocaleLowerCase()
              .includes(this.searchValuePhone.toLocaleLowerCase()) : false
          )
        )
      )
    );
  }

  resetType(): void {
    this.searchValueType = '';
    this.searchType();
  }

  // Search function
  searchType(): void {
    this.visibleType = false;
    this.users$ = this.users$.pipe(
      switchMap((item) =>
        of(
          item.filter((user) =>
            user?.status_type ?
            user.status_type
              .toString()
              .toLocaleLowerCase()
              .includes(this.searchValueType.toLocaleLowerCase()) : false
          )
        )
      )
    );
  }

  
}
