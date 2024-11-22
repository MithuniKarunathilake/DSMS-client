import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../common/header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-instructor',
  standalone: true,
  imports: [FormsModule, CommonModule,HeaderComponent],
  templateUrl: './manage-instructor.component.html',
  styleUrl: './manage-instructor.component.css'
})
export class ManageInstructorComponent {
  public user: any = {
    name: "",
    address: "",
    email: "",
    password: "",
    dob: "",
    contactNumber: "",
    experiencedYears:""
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

    this.http.post('http://localhost:8080/instructor/add-instructor', formData).subscribe({
      next: () => {
        alert('Instructor added successfully!');
        this.loadTable();
      },
      error: (err) => console.error(err)
    });
  }

  loadTable(): void {
    this.http.get('http://localhost:8080/instructor/get-instructor').subscribe({
      next: (data: any) => (this.userList = data),
      error: (err) => console.error(err)
    });
  }

  deleteUserById(id: any): void {
    this.http.delete(`http://localhost:8080/instructor/delete-instructor/${id}`).subscribe({
      next: () => {
        alert('Instructor deleted successfully!');
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

    this.http.put('http://localhost:8080/instructor/update-instructor', formData).subscribe({
      next: () => {
        alert('Instructor updated successfully!');
        this.loadTable();
      },
      error: (err) => console.error(err)
    });
  }
}