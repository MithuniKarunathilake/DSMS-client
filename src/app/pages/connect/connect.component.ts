import { Component } from '@angular/core';
import { HeaderComponent } from "../../common/header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [HeaderComponent,FormsModule,CommonModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {
  instructors: any[] = [];
  students: any[] = [];
  packages: any[] = [];
  schedules: any[] = [
    {
      instructorName: 'John Doe',
      studentName: 'Jane Smith',
      packageDescription: 'Basic Package',
      date: '2024-11-25',
      time: '10:00 AM'
    },
    {
      instructorName: 'Mary Poppins',
      studentName: 'Bob Brown',
      packageDescription: 'Premium Package',
      date: '2024-11-26',
      time: '2:00 PM'
    },
    {
      instructorName: 'Alan Turing',
      studentName: 'Grace Hopper',
      packageDescription: 'Basic Package',
      date: '2024-12-01',
      time: '9:00 AM'
    },
    {
      instructorName: 'Ada Lovelace',
      studentName: 'Tim Berners-Lee',
      packageDescription: 'Mathematics Essentials',
      date: '2024-12-02',
      time: '11:00 AM'
    },
    {
      instructorName: 'Nikola Tesla',
      studentName: 'Thomas Edison',
      packageDescription: 'Electrical Engineering Basics',
      date: '2024-12-03',
      time: '3:00 PM'
    },
    {
      instructorName: 'Steve Jobs',
      studentName: 'Bill Gates',
      packageDescription: 'Business and Innovation',
      date: '2024-12-04',
      time: '1:00 PM'
    }
  ];

  schedule: any = {
    instructorId: null,
    studentId: null,
    packageId: null,
    date: '',
    time: ''
  };

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.http.get('http://localhost:8080/instructor/get-instructor').subscribe({
      next: (data: any) => {
        console.log('Instructors:', data);
        this.instructors = data;
      },
      error: (err) => console.error('Error fetching instructors:', err)
    });
  
    this.http.get('http://localhost:8080/student/get-student').subscribe({
      next: (data: any) => {
        console.log('Students:', data);
        this.students = data;
      },
      error: (err) => console.error('Error fetching students:', err)
    });
  
    this.http.get('http://localhost:8080/package/get-package').subscribe({
      next: (data: any) => {
        console.log('Packages:', data);
        this.packages = data;
      },
      error: (err) => console.error('Error fetching packages:', err)
    });
  }
  

  createSchedule() {
    if (
      this.schedule.instructorId &&
      this.schedule.studentId &&
      this.schedule.packageId &&
      this.schedule.date &&
      this.schedule.time
    ) {
      const selectedInstructor = this.instructors.find(i => i.id === this.schedule.instructorId);
      const selectedStudent = this.students.find(s => s.id === this.schedule.studentId);
      const selectedPackage = this.packages.find(p => p.packageId === this.schedule.packageId);
  
      console.log('Selected Instructor:', selectedInstructor);
      console.log('Selected Student:', selectedStudent);
      console.log('Selected Package:', selectedPackage);
  
      if (!selectedInstructor) {
        alert('Invalid Instructor selected!');
        return;
      }
      if (!selectedStudent) {
        alert('Invalid Student selected!');
        return;
      }
      if (!selectedPackage) {
        alert('Invalid Package selected!');
        return;
      }
  
      const newSchedule = {
        instructorName: selectedInstructor.name,
        studentName: selectedStudent.name,
        packageDescription: selectedPackage.description,
        date: this.schedule.date,
        time: this.schedule.time
      };
  
      this.schedules.push(newSchedule);
  
      this.schedule = {
        instructorId: null,
        studentId: null,
        packageId: null,
        date: '',
        time: ''
      };
  
      alert('Schedule added to the table successfully!');
    } else {
      alert('Please fill in all fields!');
    }
  }  
}