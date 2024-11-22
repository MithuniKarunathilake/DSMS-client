import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private router: Router){}

  ngOnInit(): void {
    if(typeof document !== 'undefined'){
      AOS.init({
        duration:1000
      });
    }
  }

  signIn(){
    this.router.navigate(['/register']);
  }

}
