import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { HomeComponent } from "./common/home/home.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
