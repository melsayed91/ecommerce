import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';


export const ProductRoutes: Routes = [
    {
        path: 'details/:id',
        component: DetailsComponent
    }
];
