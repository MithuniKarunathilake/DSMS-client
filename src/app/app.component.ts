import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './employee/register/register.component';
import { LoginComponent } from './employee/login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponent,LoginComponent,HeaderComponent,ManageStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Safety Drive';

  ngOnInit(): void {
    initFlowbite();
  }
}
