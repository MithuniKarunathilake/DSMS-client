import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  logout() {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign-out!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "You have signed out successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['']);
        });
      }
    });
  }

}
