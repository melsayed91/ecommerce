import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FacetsComponent } from './facets/facets.component';
export const SearchRoutes: Routes = [
    {
        path: ':query',
        component: ListComponent
    }
];
