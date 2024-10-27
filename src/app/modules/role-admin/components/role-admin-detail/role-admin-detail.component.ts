import { Component, OnInit } from '@angular/core';
import { Permission } from '../../../../../enumerations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleAdminService } from '../../service/role-admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';

@Component({
  selector: 'app-role-admin-detail',
  templateUrl: './role-admin-detail.component.html',
  styleUrl: './role-admin-detail.component.scss'
})
export class RoleAdminDetailComponent implements OnInit {
  permissionsTypes: Permission[] = Object.values(Permission);
  listOfSelectedValue = [];
  loading = true;
  disableBtn = true;

  breadcrumb: Breadcrumb = {
    header: "Rollar", 
    label: "Rollar ro'yhati", 
    url: '/role-admin'
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _roleSrv: RoleAdminService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    protected breadcrumbService: BreadcrumbsService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      { 
        header:this.breadcrumb.header,
        label:this.breadcrumb.label, 
        url: this.breadcrumb.url
      },
    ]);
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      permissions: new FormControl('', [Validators.required]),
    });
    if (this.id) {
      this._roleSrv.getById(this.id).subscribe((role) => {
        this.form.patchValue(role);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }
  }

  submit() {
    if (this.form.valid) {
      this.disableBtn = true;
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create() {
    this._roleSrv
      .create(this.form.value)
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.router.navigate(['/', 'role-admin']);
      });
  }

  update(id: string) {
    this._roleSrv
      .update(id, this.form.value)
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.router.navigate(['/', 'role-admin']);
      });
  }
}
