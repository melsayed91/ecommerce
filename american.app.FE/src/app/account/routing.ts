import { Routes } from '@angular/router';
import { AuthGuardService } from '../core/services/auth.guard.service/auth-guard.service';

import { dashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/details/details.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { RequestForProposalComponent } from './request-for-proposal/request-for-proposal.component';
import { QuatationDetailsComponent } from './request-for-proposal/details/details.component';
import { RequestsComponent } from './requests/requests.component';
import { CustomersComponent } from './customers/customers.component';


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
    path: 'customers',
    canActivate: [AuthGuardService],
    component: CustomersComponent
  },
  {
    path: 'orders',
    canActivate: [AuthGuardService],
    component: OrdersComponent
  },
  {
    path: 'orders/:id',
    canActivate: [AuthGuardService],
    component: OrderDetailsComponent
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
    path: 'rfps',
    canActivate: [AuthGuardService],
    component: RequestForProposalComponent
  },
  {
    path: 'rfq/details/:id',
    canActivate: [AuthGuardService],
    component: QuatationDetailsComponent
  },
  {
    path: 'requests',
    canActivate: [AuthGuardService],
    component: RequestsComponent
  }
];
