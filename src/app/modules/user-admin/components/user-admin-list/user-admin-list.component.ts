import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { IAdmin } from '../../../../../interfaces';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { UserAdminService } from '../../service/user-admin.service';
import { BaseComponentList } from '../../../../base/components/base-list';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrl: './user-admin-list.component.scss'
})
export class UserAdminListComponent extends BaseComponentList<IAdmin> {
  admins$: Observable<IAdmin[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Adminlar", 
    label: "Adminlar ro'yhati", 
    url: '/user-admin'
  };

  constructor(
    private _baseSrv: UserAdminService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.admins$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.admins$ = this.admins$.pipe(
      switchMap((item) =>
        of(
          item.filter((admin) =>
            admin.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
