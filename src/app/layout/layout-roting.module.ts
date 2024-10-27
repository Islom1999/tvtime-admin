import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'role-admin',
                loadChildren: () => import('../modules').then((m) => m.RoleAdminModule)
            },
            {
                path: 'user-admin',
                loadChildren: () => import('../modules').then((m) => m.UserAdminModule)
            },
            {
                path: 'promo',
                loadChildren: () => import('../modules').then((m) => m.PromoModule)
            },
            {
                path: 'plan',
                loadChildren: () => import('../modules').then((m) => m.PlanModule)
            },
            {
                path: 'category',
                loadChildren: () => import('../modules').then((m) => m.CategoryModule)
            },
            {
                path: 'country',
                loadChildren: () => import('../modules').then((m) => m.CountryModule)
            },
            {
                path: 'movie-genre',
                loadChildren: () => import('../modules').then((m) => m.MovieGenreModule)
            },
            {
                path: 'sounder',
                loadChildren: () => import('../modules').then((m) => m.SounderModule)
            },
            {
                path: 'year',
                loadChildren: () => import('../modules').then((m) => m.YearModule)
            },
            {
                path: 'movie',
                loadChildren: () => import('../modules').then((m) => m.MovieModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../modules').then((m) => m.UserClientModule)
            },
            {
                path: 'order',
                loadChildren: () => import('../modules').then((m) => m.OrderModule)
            },
            {
                path: 'video',
                loadChildren: () => import('../modules').then((m) => m.VideosModule)
            },
            {
                path: '**',
                redirectTo: '/order'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
