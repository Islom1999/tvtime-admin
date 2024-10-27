import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../auth/auth.service';
import { PermissionService } from '../shared/services/permission.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,  
    private authSrv: AuthService,  
  ){}

  ngOnInit(): void {
    this.permissions.getPermisssion().subscribe(permission => {
      this.permissionService.loadPermissions(permission);
    })
  }

  logout(){
    return this.authSrv.logout()
  }
}
