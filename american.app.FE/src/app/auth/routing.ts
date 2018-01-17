import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';


export const RegisterRoutes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    }
];
