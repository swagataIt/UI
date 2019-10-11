import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css']
})
export class MentorDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  id;

  ngOnInit() {
    this.id=localStorage.getItem('mentor');
    
  }
  logout()
  {
    localStorage.removeItem('mentor');
    console.log(localStorage.getItem('mentor'));
    this.router.navigate(['index']);
  } 

}
