import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';
import { RoleType, StatusType } from '../../../../../enumerations';
import { UserClientService } from '../../service/user-client.service';

@Component({
  selector: 'app-user-client-detail',
  templateUrl: './user-client-detail.component.html',
  styleUrl: './user-client-detail.component.scss'
})
export class UserClientDetailComponent {
  @Input()
  id!: string;
  statusType: StatusType[] = Object.values(StatusType);
  loading = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private userSrv: UserClientService,
    private nzMessageService: NzMessageService,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      premium_end_date: new FormControl('', [Validators.required]),
      status_type: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this.userSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.loading = false
      });
    } else {
      this.loading = false
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.id);
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

  update(id: string) {
    this.userSrv
      .update(id, {...this.form.value})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.drawerRef.close()
      });
  }

  back(){
    this.drawerRef.close()
  }
}
