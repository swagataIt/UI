import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { FormGroup,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UserDtlService }from '../../../Services/user-dtl.service';
import { Router } from '@angular/router';

import { VirtualTimeScheduler } from 'rxjs';
@Component({
  selector: 'app-admin-technologies',
  templateUrl: './admin-technologies.component.html',
  styleUrls: ['./admin-technologies.component.css']
})
export class AdminTechnologiesComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:UserDtlService,private router: Router) { }

  AddTech:FormGroup;
  submitted = false;
  skillData:object;
  resetForm(fb ?: FormGroup){
    this.AddTech=this.fb.group({
      name :'',
      toc :'',
      prerequisites :'',
      fees:''
    })
  }

  ngOnInit() {

   

    this.AddTech=this.fb.group({
      name:['',Validators.required],
      toc:['',Validators.required],
      prerequisites:['',Validators.required],
      fees:['',Validators.required]
  });


  this.getList();

  }


getList()
{
  this.service.refreshList().subscribe(data=>{
    this.skillData=data;
    console.log("mydata " ,this.skillData)
  });
}


  onSubmit(AddTech ?: FormGroup){
    this.submitted = true;
    if (this.AddTech.invalid) {
      return;
    }
    
    var result={
      name:this.AddTech.value.name,
      toc:this.AddTech.value.toc,
      prerequisites:this.AddTech.value.prerequisites,
      fees:this.AddTech.value.fees,
    }

    this.service.addtech(result).subscribe(res => {
      console.log(res);
      this.getList();
    })
    this.resetForm();
    
  }
  deleteSkill(id){
    this.service.deleteSkills(id).subscribe(res => {
      this.getList();
    })
    
    this.resetForm();
    
  }


  

}
