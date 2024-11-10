import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-packages',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './manage-packages.component.html',
  styleUrl: './manage-packages.component.css'
})
export class ManagePackagesComponent {
  public user:any = {
    description:"",
    price:"",
    lisenceType:""
  };

  constructor(private http:HttpClient){
    this.loadTable();
  }

  public addUser(){
    this.http.post("http://localhost:8080/package/add-package",this.user).subscribe((data)=>{
        alert("User Added!!!!");
    })
  }

  public userList: any = [];

  loadTable() {
    this.http.get("http://localhost:8080/package/get-package").subscribe(data => {
      console.log(data);
      this.userList = data;
    })
  }

  deleteUserById(id: any) {
    console.log(id);

    this.http.delete(`http://localhost:8080/package/delete-package/${id}`).subscribe(data => {
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
    this.http.put("http://localhost:8080/package/update-package", this.userTemp).subscribe(data => {
      alert("User Updated!!!!!")
    })
  }

}
