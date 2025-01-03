import { Routes } from '@angular/router';
import { LoginComponent } from './employee/login/login.component';
import { RegisterComponent } from './employee/register/register.component';
import { HomeComponent } from './common/home/home.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';
import { ManageInstructorComponent } from './pages/manage-instructor/manage-instructor.component';
import { ManagePackagesComponent } from './pages/manage-packages/manage-packages.component';
import { ShedularComponent } from './pages/shedular/shedular.component';
import { ConnectComponent } from './pages/connect/connect.component';

export const routes: Routes = [
    
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,

    },
    {

        path: 'register',
        component: RegisterComponent,
    },
    {

        path: 'manage-student',
        component: ManageStudentComponent,
    },
    {

        path: 'manage-instructor',
        component: ManageInstructorComponent,
    },
    {

        path: 'manage-package',
        component: ManagePackagesComponent,
    },
    {
        path: 'shedular',
        component: ShedularComponent,
    },
    {
        path: 'connect',
        component: ConnectComponent,
    }
];
