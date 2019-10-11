import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { FormGroup,ReactiveFormsModule } from '@angular/forms';
import { UserDtlService }from '../../Services/user-dtl.service';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-user-not-logged-in',
  templateUrl: './user-not-logged-in.component.html',
  styleUrls: ['./user-not-logged-in.component.css']
})
export class UserNotLoggedInComponent implements OnInit {
  alert: any;

  constructor(private fb:FormBuilder,private service:UserDtlService,private router: Router) { }

  Search:FormGroup;
  skillData;
  UserRegister:FormGroup;

  getSkills()
  {
  this.service.refreshList().subscribe(data=>{
    this.skillData=data;
  });
  }

  ngOnInit() {

    this.Search=this.fb.group({
      technology:['',Validators.required]
    });

    this.getSkills();

    this.UserRegister=this.fb.group({
      firstName:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      lastName:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      userName:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactNumber:['',[Validators.required,Validators.pattern('^([6-9]{1})([0-9]{9})$')]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8)]]
      }, { validator: this.MustMatch('password', 'confirmPassword')
    });

  }
Trainerdetails:object;
  onSubmit()
  {
      if (this.Search.invalid) {
        return;
      }
      
      this.service.trainerList(this.Search.value.technology).subscribe(data=>{
        this.Trainerdetails=data;
        console.log('checking');
        console.log(this.Trainerdetails);
      });
      
  
  }
  MustMatch( controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } 
      else {
          matchingControl.setErrors(null);
      }
    }
  }
  result1:FormGroup;

  onSubmit4(UserRegister ?: FormGroup){

    if (this.UserRegister.invalid) {
      return;
    }
    
    var result1={
      firstName:this.UserRegister.value.firstName,
      lastName:this.UserRegister.value.lastName,
      userName:this.UserRegister.value.userName,
      password:this.UserRegister.value.password,
      email:this.UserRegister.value.email,
      contactNumber:this.UserRegister.value.contactNumber,
      role:1,
      active:true
    }

    this.service.signin(result1).subscribe(res => {
      alert('Sign Up successfull');
      localStorage.setItem('user',res['id']);
      console.log(localStorage.getItem('user'));
          this.router.navigate(['user']);
      //console.log(res);
    })
    
    
    
  }
  
}
