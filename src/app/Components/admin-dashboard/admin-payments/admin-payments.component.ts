import { Component, OnInit } from '@angular/core';
import { UserDtlService } from 'src/app/Services/user-dtl.service';
import * as _ from "underscore";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css']
})
export class AdminPaymentsComponent implements OnInit {

  PaymentData: object;
  PaymentDataById: object;
  noCommisionTaken: object;
  edit: boolean = false;
  commission:number;
  employees:object;
  model:any;
  alert: any;
  constructor(private fb: FormBuilder, private service: UserDtlService) {
    
   }

  ngOnInit() {
    this.getPayment();
    this.edit = false;
  }

  getPayment() {
    this.service.paymentList().subscribe(data => {
      this.PaymentData = data;

      console.log(this.noCommisionTaken);
      console.log(this.PaymentData);
    });
  }
  commision(id) {
    this.service.paymentDetailsById(id).subscribe(data=>
      {
        this.model = data[0];
        console.log(this.model);
      })
  }

  commissionEdit(id) {

    console.log(id);
    
      var result1 = {
        amount:this.model['amount'],
        mentorId:this.model['mentorId'],
        mentorName:this.model['mentorName'],
        trainingId:this.model['trainingId'],
        skillName:this.model['skillName'],
        totalAmountToMentor:this.model['amount']-this.model.commision,
        commision:this.model.commision
      }
      console.log(result1);
      
      this.service.paymentEdit(id, result1).subscribe(res => {
        console.log('success');
        alert('Successfully Updated');
        //console.log(res);
        this.getPayment();
      });


  }
}
