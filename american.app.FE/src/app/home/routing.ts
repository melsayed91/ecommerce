import { Routes } from '@angular/router';
import { HomeComponent } from './welcome/home.component';
import { ServicesComponent } from './services/services.component';
import { HelpComponent } from './helpcenter/help.component';
import {ContactUsComponent} from "./contact-us/contact-us.component";

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
    },
  {
    path: 'contactUs',
    component: ContactUsComponent
  }
];
