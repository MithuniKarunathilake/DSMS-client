import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import jsPDF from 'jspdf';
import AOS from 'aos';
import { ShedularComponent } from "./pages/shedular/shedular.component";
import { ManageInstructorComponent } from "./pages/manage-instructor/manage-instructor.component";
import { ManageStudentComponent } from "./pages/manage-student/manage-student.component";
import { ManagePackagesComponent } from "./pages/manage-packages/manage-packages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShedularComponent, ManageInstructorComponent, ManageStudentComponent, ManagePackagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Safety Drive';

  ngOnInit(): void { 
    if(typeof document !== 'undefined'){
    AOS.init({
      duration:1000
    });
  }
}
}
