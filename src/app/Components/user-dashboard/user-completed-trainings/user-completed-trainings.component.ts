import { Component, OnInit } from '@angular/core';
import { UserDtlService } from 'src/app/Services/user-dtl.service';
import { Router } from '@angular/router';
import * as _ from "underscore";
@Component({
  selector: 'app-user-completed-trainings',
  templateUrl: './user-completed-trainings.component.html',
  styleUrls: ['./user-completed-trainings.component.css']
})
export class UserCompletedTrainingsComponent implements OnInit {

  constructor(private service: UserDtlService, private router: Router) { }

  userId: any;
  userTrainingData: object;
  completedTraining: object;
  TrainingData: object;

  ngOnInit() {
    this.userId = localStorage.getItem('user');
    this.getTrainingByUserId();
  }

  getTrainingByUserId() {
    this.service.userTrainingList(this.userId).subscribe(data => {
      this.userTrainingData = data;
      this.completedTraining = _.where(this.userTrainingData, { status: "completed" });
      console.log(this.completedTraining);
    });
  }

}
