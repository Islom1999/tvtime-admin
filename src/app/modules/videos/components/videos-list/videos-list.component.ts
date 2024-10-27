import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { IVideo } from '../../../../../interfaces';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { BaseComponentList } from '../../../../base/components/base-list';
import { VideosService } from '../../service/videos.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrl: './videos-list.component.scss'
})
export class VideosListComponent extends BaseComponentList<IVideo> {
  videos$: Observable<IVideo[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Videolar", 
    label: "Videolar ro'yhati", 
    url: '/'
  };

  constructor(
    private _baseSrv: VideosService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.videos$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.videos$ = this.videos$.pipe(
      switchMap((item) =>
        of(
          item.filter((video) =>
            video.file_name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  // formatDate(date: Date): string {
  //   const formattedDate = formatDate(date, 'dd.MM.yyyy HH:mm:ss', 'en-US', '+0500');
  //   return formattedDate;
  // }
}
