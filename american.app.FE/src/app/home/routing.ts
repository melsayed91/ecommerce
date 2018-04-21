import { Routes } from '@angular/router';
import { HomeComponent } from './welcome/home.component';
import { ServicesComponent } from './services/services.component';
import { HelpComponent } from './helpcenter/help.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'services',
        component: ServicesComponent
    },
    {
        path: 'help',
        component: HelpComponent
    }
];
