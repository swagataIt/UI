import { Component, OnInit } from '@angular/core';
import { UserDtlService } from 'src/app/Services/user-dtl.service';
import { Router } from '@angular/router';
import * as _ from "underscore";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-current-trainings',
  templateUrl: './user-current-trainings.component.html',
  styleUrls: ['./user-current-trainings.component.css']
})
export class UserCurrentTrainingsComponent implements OnInit {

  userId: any;
  userTrainingData: object;
  currentTraining: object;
  edit: boolean = false;
  TrainingData: object;
  model:any;
  alert: any;

  constructor(private fb: FormBuilder, private service: UserDtlService, private router: Router) { }


  ngOnInit() {
    this.userId = localStorage.getItem('user');
    this.getTrainingByUserId();
    this.edit = false;

    
  }

  getTrainingByUserId() {
    this.service.userTrainingList(this.userId).subscribe(data => {
      this.userTrainingData = data;
      this.currentTraining = _.where(this.userTrainingData, { status: "current" });
      //console.log(this.currentTraining);
    });
  }

  editOption(id) {
    this.service.trainingById(id).subscribe(data=>
      {
        this.model = data;
      })

  }


  updateProgress(id) {
    //console.log(id);


      let progress2=this.model.progress;
      if(progress2<100)
      {
        var result1 = {
          rejectNotify: false,
          timeSlot: this.model["timeSlot"],
          startDate: this.model['startDate'],
          endDate: this.model['endDate'],
          userName: this.model['userName'],
          fees: this.model['fees'],
          userId: this.model['userId'],
          mentorId: this.model['mentorId'],
          mentorName: this.model['mentorName'],
          skillId: this.model['skillId'],
          skillname: this.model['skillname'],
          requested:this.model['requested'],
          status:this.model['status'],
          progress:this.model.progress,
          paymentStatus:this.model['paymentStatus']
        }
        console.log(result1);
        this.service.trainingEdit(id,result1).subscribe(res => {
          //console.log('success');
          alert('Progress Updated Successfully');
          //console.log(res);
          this.getTrainingByUserId();
        });
      
      }
      else{
        var result2 = {
          rejectNotify: false,
          timeSlot: this.model["timeSlot"],
          startDate: this.model['startDate'],
          endDate: this.model['endDate'],
          userName: this.model['userName'],
          fees: this.model['fees'],
          userId: this.model['userId'],
          mentorId: this.model['mentorId'],
          mentorName: this.model['mentorName'],
          skillId: this.model['skillId'],
          skillname: this.model['skillname'],
          requested:this.model['requested'],
          status:"completed",
          progress:this.model.progress,
          paymentStatus:this.model['paymentStatus']
        }
        console.log(result1);
        this.service.trainingEdit(id,result2).subscribe(res => {
          //console.log('success');
          alert('Training Completed')
          //console.log(res);
          this.getTrainingByUserId();
        });
      }
    
    
  }

}
