import { Component, OnInit } from '@angular/core';
import { UserDtlService } from 'src/app/Services/user-dtl.service';
import * as _ from "underscore";
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-admin-block-user',
  templateUrl: './admin-block-user.component.html',
  styleUrls: ['./admin-block-user.component.css']
})
export class AdminBlockUserComponent implements OnInit {

  AllData:object;
  UserData: object;
  UserDataById: object;


  constructor(private fb: FormBuilder, private service: UserDtlService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.service.getAllData().subscribe(data => {
      this.AllData = data;
      this.UserData=_.where(this.AllData,{role:1});
      console.log(this.UserData);

    });
  }
  block(id) {
    console.log(id);
    this.service.getUserById(id).subscribe(data => {
      this.UserDataById = data;
      console.log(this.UserDataById);


      var result = {
        email:this.UserDataById['email'],
        userName:this.UserDataById['userName'],
        password:this.UserDataById['password'],
        firstName:this.UserDataById['firstName'],
        lastName:this.UserDataById['lastName'],
        contactNumber:this.UserDataById['contactNumber'],
        role:this.UserDataById['role'],
        linkdinUrl:this.UserDataById['linkdinUrl'],
        yearOfExperience:this.UserDataById['yearOfExperience'],
        active:false,
        training:this.UserDataById['training']

      }
      console.log(result);
      this.service.userEdit(id, result).subscribe(res => {
        console.log('success');
        //console.log(res);
        this.getUser();
      });


    });
  }
  unblock(id) {
    console.log(id);
    this.service.getUserById(id).subscribe(data => {
      this.UserDataById = data;
      console.log(this.UserDataById);


      var result = {
        email:this.UserDataById['email'],
        userName:this.UserDataById['userName'],
        password:this.UserDataById['password'],
        firstName:this.UserDataById['firstName'],
        lastName:this.UserDataById['lastName'],
        contactNumber:this.UserDataById['contactNumber'],
        role:this.UserDataById['role'],
        linkdinUrl:this.UserDataById['linkdinUrl'],
        yearOfExperience:this.UserDataById['yearOfExperience'],
        active:true,
        training:this.UserDataById['training']

      }
      console.log(result);
      this.service.userEdit(id, result).subscribe(res => {
        console.log('success');
        //console.log(res);
        this.getUser();
      });


    });
  }

}
