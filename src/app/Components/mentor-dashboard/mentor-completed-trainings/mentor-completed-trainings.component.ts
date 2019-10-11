import { Component, OnInit } from '@angular/core';
import { UserDtlService } from 'src/app/Services/user-dtl.service';
import * as _ from "underscore";
@Component({
  selector: 'app-mentor-completed-trainings',
  templateUrl: './mentor-completed-trainings.component.html',
  styleUrls: ['./mentor-completed-trainings.component.css']
})
export class MentorCompletedTrainingsComponent implements OnInit {

  mentorId: any;
  mentorTrainingData: object;
  completedTraining: object;
  TrainingData: object;
  constructor(private service: UserDtlService) { }

  ngOnInit() {
    this.mentorId = localStorage.getItem('mentor');
    this.getTrainingByUserId();
  }

  getTrainingByUserId() {
    this.service.mentorTrainingList(this.mentorId).subscribe(data => {
      this.mentorTrainingData = data;
      this.completedTraining = _.where(this.mentorTrainingData, { status: "completed" });
      console.log(this.completedTraining);
    });
  }

}
