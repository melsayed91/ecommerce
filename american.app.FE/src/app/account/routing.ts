import {Routes} from '@angular/router';
import {AuthGuardService} from '../core/services/auth.guard.service/auth-guard.service';

import {dashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {RequestForQuotationsComponent} from './request-for-quotations/request-for-quotations.component';
import {RequestsComponent} from './requests/requests.component';


export const RegisterRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: dashboardComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuardService],
    component: SettingsComponent
  },
  {
    path: 'rfqs',
    canActivate: [AuthGuardService],
    component: RequestForQuotationsComponent
  },
  {
    path: 'requests',
    canActivate: [AuthGuardService],
    component: RequestsComponent
  }
];
