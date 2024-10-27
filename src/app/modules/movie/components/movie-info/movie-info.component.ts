import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { IMovie } from '../../../../../interfaces';
import { Observable } from 'rxjs';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { SerialPartDetailComponent } from '../serial-part-detail/serial-part-detail.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MovieType } from '../../../../../enumerations';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent implements OnInit {
  @Input()
  id!: string;
  @Input()
  movie_type!:MovieType

  movie$!: Observable<IMovie>
  movie_type_part = MovieType.serial

  constructor(
    private _movieSrv: MovieService,
    private _nzMessageService: NzMessageService,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef,
  ){}
 
  ngOnInit(): void {
    this.movie$ = this._movieSrv.getByIdMovie(this.id)
  }

  delete(id: string | undefined): void {
    if(!id) return
    this._movieSrv.delete(id).subscribe((data) => {
      this._nzMessageService.error('delete')
    })
    this.movie$ = this._movieSrv.getByIdMovie(this.id)
  }

  // info
  open(id?:string): void {
    this.drawerService.create<SerialPartDetailComponent, { id:string, parent_id:string }, string>({
      nzTitle: 'Serial',
      nzContent: SerialPartDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
        parent_id: this.id,
      }
    });
    this.close()
  }

  close() {
    this.drawerRef.close()
  }
}
