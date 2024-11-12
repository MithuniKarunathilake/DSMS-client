import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private router: Router,private http: HttpClient) { }

  save() {
    let bodyData = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "confirmPassword": this.confirmPassword
    };
    this.http.post("http://localhost:8080/employee/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
      this.router.navigate(['login']);
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
