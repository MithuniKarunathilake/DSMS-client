import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-manage-instructor',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,HeaderComponent],
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

  constructor(private http: HttpClient) {
    this.loadTable();
  }

  public addUser() {
    this.http.post("http://localhost:8080/instructor/add-instructor", this.user).subscribe((data) => {
      alert("User Added!!!!");
    })
  }


  public userList: any = [];

  loadTable() {
    this.http.get("http://localhost:8080/instructor/get-instructor").subscribe(data => {
      console.log(data);
      this.userList = data;
    })
  }

  deleteUserById(id: any) {
    console.log(id);

    this.http.delete(`http://localhost:8080/instructor/delete-instructor/${id}`).subscribe(data => {
      alert("User deleted !!!!");
      this.loadTable();
    })

  }
  public userTemp: any = {}
  updateUser(user: any) {
    console.log(user);
    this.userTemp = user;

  }

  saveUser() {
    this.http.put("http://localhost:8080/instructor/update-instructor", this.userTemp).subscribe(data => {
      alert("User Updated!!!!!")
    })
  }

}
