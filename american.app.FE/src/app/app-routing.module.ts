import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './core/services/auth.guard.service/auth-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule'
            },
            {
                path: 'home',
                loadChildren: './home/home.module#HomeModule'
            },
            {
                path: 'account',
                loadChildren: './account/account.module#AccountModule',
                canLoad: [AuthGuardService]
            },
          {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
