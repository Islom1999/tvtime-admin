import { Component, OnInit } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IRole } from '../../../../../interfaces';
import { RoleAdminService } from '../../service/role-admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-role-admin-list',
  templateUrl: './role-admin-list.component.html',
  styleUrl: './role-admin-list.component.scss'
})
export class RoleAdminListComponent extends BaseComponentList<IRole> {
  roles$: Observable<IRole[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Rollar", 
    label: "Rollar ro'yhati", 
    url: '/role-admin'
  };

  constructor(
    private _baseSrv: RoleAdminService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.roles$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.roles$ = this.roles$.pipe(
      switchMap((item) =>
        of(
          item.filter((role) =>
            role.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
