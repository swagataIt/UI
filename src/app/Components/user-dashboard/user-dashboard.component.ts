import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  id;

  ngOnInit() {
    this.id=localStorage.getItem('user');
  }
  
  logout()
  {
    localStorage.clear();
    console.log(localStorage.getItem('user'));
    this.router.navigate(['index']);
  }

}
