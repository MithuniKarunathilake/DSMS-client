import { Routes } from '@angular/router';
import { LoginComponent } from './employee/login/login.component';
import { RegisterComponent } from './employee/register/register.component';
import { HomeComponent } from './common/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {

        path: 'register',
        component: RegisterComponent,
    }
];
