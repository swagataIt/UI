import { Component, OnInit } from '@angular/core';
import { UserDtlService } from 'src/app/Services/user-dtl.service';
import * as _ from "underscore";
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-admin-block-mentor',
  templateUrl: './admin-block-mentor.component.html',
  styleUrls: ['./admin-block-mentor.component.css']
})
export class AdminBlockMentorComponent implements OnInit {

  AllData:object;
  MentorData: object;
  MentorDataById: object;
  constructor(private fb: FormBuilder, private service: UserDtlService) { }

  ngOnInit() {
    this.getMentor();
  }
  getMentor() {
    this.service.getAllData().subscribe(data => {
      this.AllData = data;
      this.MentorData=_.where(this.AllData,{role:2});
      console.log(this.MentorData);

    });
  }

  block(id) {
    console.log(id);
    this.service.getUserById(id).subscribe(data => {
      this.MentorDataById = data;
      console.log(this.MentorDataById);


      var result = {
        email:this.MentorDataById['email'],
        userName:this.MentorDataById['userName'],
        password:this.MentorDataById['password'],
        firstName:this.MentorDataById['firstName'],
        lastName:this.MentorDataById['lastName'],
        contactNumber:this.MentorDataById['contactNumber'],
        role:this.MentorDataById['role'],
        linkdinUrl:this.MentorDataById['linkdinUrl'],
        yearOfExperience:this.MentorDataById['yearOfExperience'],
        active:false,
        training:this.MentorDataById['training']

      }
      console.log(result);
      this.service.userEdit(id, result).subscribe(res => {
        console.log('success');
        //console.log(res);
        this.getMentor();
      });


    });
  }
  unblock(id) {
    console.log(id);
    this.service.getUserById(id).subscribe(data => {
      this.MentorDataById = data;
      console.log(this.MentorDataById);


      var result = {
        email:this.MentorDataById['email'],
        userName:this.MentorDataById['userName'],
        password:this.MentorDataById['password'],
        firstName:this.MentorDataById['firstName'],
        lastName:this.MentorDataById['lastName'],
        contactNumber:this.MentorDataById['contactNumber'],
        role:this.MentorDataById['role'],
        linkdinUrl:this.MentorDataById['linkdinUrl'],
        yearOfExperience:this.MentorDataById['yearOfExperience'],
        active:true,
        training:this.MentorDataById['training']

      }
      console.log(result);
      this.service.userEdit(id, result).subscribe(res => {
        console.log('success');
        //console.log(res);
        this.getMentor();
      });


    });
  }
}
