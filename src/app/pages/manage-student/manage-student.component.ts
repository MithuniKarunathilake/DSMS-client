import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.css'
})
export class ManageStudentComponent {
  public user: any = {
    name: "",
    address: "",
    email: "",
    password: "",
    dob: "",
    contactNumber: "",
    image: null
  };

  public userList: any[] = [];
  public userTemp: any = {};
  private file: File | null = null;
  constructor(private http: HttpClient) {
    this.loadTable();
  }

  onFileChange(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.file = selectedFile;
    }
  }

  addUser(): void {
    const formData = new FormData();
    Object.keys(this.user).forEach((key) => {
      formData.append(key, this.user[key]);
    });
    if (this.file) {
      formData.append('file', this.file);
    }

    this.http.post('http://localhost:8080/student/add-student', formData).subscribe({
      next: () => {
        alert('Student added successfully!');
        this.loadTable();
      },
      error: (err) => console.error(err)
    });
    this.clearFields();
  }

  loadTable(): void {
    this.http.get('http://localhost:8080/student/get-student').subscribe({
      next: (data: any) => (this.userList = data),
      error: (err) => console.error(err)
    });
  }

  deleteUserById(id: any): void {
    this.http.delete(`http://localhost:8080/student/delete-student/${id}`).subscribe({
      next: () => {
        alert('Student deleted successfully!');
        this.loadTable();
      },
      error: (err) => console.error(err)
    });
  }

  updateUser(user: any): void {
    this.userTemp = { ...user };
  }

  saveUser(): void {
    const formData = new FormData();
    Object.keys(this.userTemp).forEach((key) => {
      formData.append(key, this.userTemp[key]);
    });
    if (this.file) {
      formData.append('file', this.file);
    }

    this.http.put('http://localhost:8080/student/update-student', formData).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.loadTable();
      },
      error: (err) => console.error(err)
    });
  }

  clearFields(): void {
    this.user = {
      name: '',
      address: '',
      email: '',
      password: '',
      dob: '',
      contactNumber: '',
      image: null
    };
  }
}