import { Component } from '@angular/core';
import { IAdmin, IPlan } from '../../../../../interfaces';
import { PromoService } from '../../service/promo.service';
import { UserAdminService } from '../../../user-admin/service/user-admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, catchError, count } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PlanService } from '../../../plan/service/plan.service';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrl: './promo-detail.component.scss'
})
export class PromoDetailComponent {
  admin$: Observable<IAdmin[]> = of([]);
  plans$: Observable<IPlan[]> = of([]);
  loading = true;
  disableBtn = true;

  breadcrumb: Breadcrumb = {
    header: "Promolar", 
    label: "Promolar ro'yhati", 
    url: '/promo'
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _promoSrv: PromoService,
    private _adminSrv: UserAdminService,
    private _planSrv: PlanService,
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
      code: new FormControl('', [Validators.required]),
      discount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      count: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1000)]),
      is_active: new FormControl('', [Validators.required]),
      admin_id: new FormControl('', [Validators.required]),
      plan_id: new FormControl(null, []),
    });
    if (this.id) {
      this._promoSrv.getById(this.id).subscribe((promo) => {
        this.form.patchValue(promo);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }

    this.admin$ = this._adminSrv.getAll()
    this.plans$ = this._planSrv.getAll()
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
    this._promoSrv
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
        this.router.navigate(['/', 'promo']);
      });
  }

  update(id: string) {
    this._promoSrv
      .update(id, {...this.form.value, discount: +this.form.value.discount})
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
        this.router.navigate(['/', 'promo']);
      });
  }
}
