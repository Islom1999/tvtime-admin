import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, min, of } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { YearService } from '../../service/year.service';

@Component({
  selector: 'app-year-detail',
  templateUrl: './year-detail.component.html',
  styleUrl: './year-detail.component.scss'
})
export class YearDetailComponent {
  loading = true;
  disableBtn = true;

  breadcrumb: Breadcrumb = {
    header: "Year", 
    label: "Year ro'yhati", 
    url: '/year'
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _modelSrv: YearService,
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
      year: new FormControl(1900, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    });
    if (this.id) {
      this._modelSrv.getById(this.id).subscribe((year) => {
        this.form.patchValue(year);
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
    this._modelSrv
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
        this.router.navigate(['/', 'year']);
      });
  }

  update(id: string) {
    this._modelSrv
      .update(id, {...this.form.value})
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
        this.router.navigate(['/', 'year']);
      });
  }
}
