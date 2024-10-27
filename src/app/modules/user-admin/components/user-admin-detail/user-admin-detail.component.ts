import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAdminService } from '../../service/user-admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, of } from 'rxjs';
import { IRole } from '../../../../../interfaces';
import { RoleAdminService } from '../../../role-admin/service/role-admin.service';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';

@Component({
  selector: 'app-user-admin-detail',
  templateUrl: './user-admin-detail.component.html',
  styleUrl: './user-admin-detail.component.scss'
})
export class UserAdminDetailComponent {
  role$: Observable<IRole[]> = of([]);
  loading = true;
  disableBtn = true;

  breadcrumb: Breadcrumb = {
    header: "Adminlar", 
    label: "Adminlar ro'yhati", 
    url: '/user-admin'
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _adminSrv: UserAdminService,
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        this.id ? Validators.minLength(6) : Validators.required, 
        Validators.minLength(6)
      ]),
      is_block: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
    });
    if (this.id) {
      this._adminSrv.getById(this.id).subscribe((admin) => {
        this.form.patchValue(admin);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }

    this.role$ = this._roleSrv.getAll()
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
    this._adminSrv
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
        this.router.navigate(['/', 'user-admin']);
      });
  }

  update(id: string) {
    this._adminSrv
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
        this.router.navigate(['/', 'user-admin']);
      });
  }
}
