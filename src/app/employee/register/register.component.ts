import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private http: HttpClient) { }

  save() {
    let bodyData = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "confirmPassword": this.confirmPassword
    };
    this.http.post("http://localhost:8080/employee/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Registered Successfully");
    });

    this.clearFields();
  }

  clearFields() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }

}
