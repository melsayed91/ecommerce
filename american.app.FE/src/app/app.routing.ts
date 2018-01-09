import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/layout.component';


export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full',
    }, 
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'Home',
                loadChildren: './home/home.module#HomeModule'
            }
        ]
    }
    // {
    //     path: '',
    //     component: AdminLayoutComponent,
    //     children: [{
    //         path: 'admin',
    //         loadChildren: './pages/pages.module#PagesModule'
    //     }]
    // }
];
