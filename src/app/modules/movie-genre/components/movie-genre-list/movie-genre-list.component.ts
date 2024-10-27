import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IMovieGenre } from '../../../../../interfaces/movie_genre';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { MovieGenreService } from '../../service/movie-genre.service';

@Component({
  selector: 'app-movie-genre-list',
  templateUrl: './movie-genre-list.component.html',
  styleUrl: './movie-genre-list.component.scss'
})
export class MovieGenreListComponent extends BaseComponentList<IMovieGenre> {
  movie_genres$: Observable<IMovieGenre[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "MovieGenrelar", 
    label: "MovieGenrelar ro'yhati", 
    url: '/user-movie_genre'
  };

  constructor(
    private _baseSrv: MovieGenreService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.movie_genres$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.movie_genres$ = this.movie_genres$.pipe(
      switchMap((item) =>
        of(
          item.filter((movie_genre) =>
            movie_genre.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
