import { Routes } from '@angular/router';
import { AuthGuardService } from '../core/services/auth.guard.service/auth-guard.service';

import { dashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { RequestForProposalComponent } from './request-for-proposal/request-for-proposal.component';
import { QuatationDetailsComponent } from './request-for-proposal/details/details.component';


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
        path: 'rfps',
        canActivate: [AuthGuardService],
        component: RequestForProposalComponent
    },
    {
        path: 'rfq/details/:id',
        canActivate: [AuthGuardService],
        component: QuatationDetailsComponent
    }
];
