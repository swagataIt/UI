import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserDtlService } from '../../Services/user-dtl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  alert: any;

  constructor(private fb: FormBuilder, private service: UserDtlService, private router: Router) { }

  UserLogin: FormGroup;
  MentorLogin: FormGroup;
  AdminLogin: FormGroup;
  UserRegister: FormGroup;
  MentorRegister: FormGroup;
  submitted = false;
  formData: any;

  /* -----------------------RESET USER REGISTRATION-------------------------- */


  resetForm(fb?: FormGroup) {
    this.UserRegister = this.fb.group({
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      contactNumber: '',
      confirmPassword: ''
    })
  }

  /* --------------------------------COMPARE PASSWORD------------------------------ */


  MustMatch(controlName: string, matchingControlName: string) {
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


  /* --------------------SKILLS FROM ADMIN FOR MENTOR REGISTRATION----------------------- */


  skillData: object;
  getList() {
    this.service.refreshList().subscribe(data => {
      this.skillData = data;
      console.log("mydata ", this.skillData)
    });
  }



  /* --------------------ADD VALIDATION TO FORMS----------------------- */


  ngOnInit() {

    this.UserRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactNumber: ['', [Validators.required, Validators.pattern('^([6-9]{1})([0-9]{9})$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });

    this.UserLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.MentorLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.AdminLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.MentorRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactNumber: ['', [Validators.required, Validators.pattern('^([6-9]{1})([0-9]{9})$')]],
      linkdinUrl: ['', Validators.required],
      technology: ['', Validators.required],
      yearOfExperience: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });

    this.getList();


  }


  /* -----------------------USER REGISTRATION-------------------------- */


  result1: FormGroup;

  onSubmit4(UserRegister?: FormGroup) {

    this.submitted = true;
    if (this.UserRegister.invalid) {
      return;
    }

    var result1 = {
      firstName: this.UserRegister.value.firstName,
      lastName: this.UserRegister.value.lastName,
      userName: this.UserRegister.value.userName,
      password: this.UserRegister.value.password,
      email: this.UserRegister.value.email,
      contactNumber: this.UserRegister.value.contactNumber,
      role: 1,
      active: true
    }

    this.service.signin(result1).subscribe(res => {
      alert('Sign Up successfull');
      localStorage.setItem('user', res['id']);
      console.log(localStorage.getItem('user'));
      localStorage.setItem('role', this.res.role);
      this.router.navigate(['user']);
    });

    this.resetForm();

  }

  /* -----------------------MENTOR REGISTRATION-------------------------- */

  result2: FormGroup;
  onSubmit5(MentorRegister?: FormGroup) {
    this.submitted = true;
    if (this.MentorRegister.invalid) {
      return;
    }
    var result2 = {
      firstName: this.MentorRegister.value.firstName,
      lastName: this.MentorRegister.value.lastName,
      userName: this.MentorRegister.value.userName,
      password: this.MentorRegister.value.password,
      email: this.MentorRegister.value.email,
      linkdinUrl: this.MentorRegister.value.linkdinUrl,
      training: this.MentorRegister.value.technology,
      yearOfExperience: this.MentorRegister.value.yearOfExperience,
      contactNumber: this.MentorRegister.value.contactNumber,
      role: 2,
      active: true
    }
    this.service.signin(result2).subscribe(res => {
      //console.log('successfully inserted');
      alert('Sign Up successfull');
      this.service.isUserLoggedIn = true;
      localStorage.setItem('mentor', this.res.id);
      localStorage.setItem('role', this.res.role);
      //console.log(localStorage.getItem('user'));
      this.router.navigate(['mentor']);
    })
    //this.resetForm();
  }

  /* -----------------------MENTOR LOGIN-------------------------- */


  res;
  id;
  onSubmit2(MentorLogin?: FormGroup) {

    this.submitted = true;
    if (this.MentorLogin.invalid) {
      return;
    }
    var result1 = {
      password: this.MentorLogin.value.password,
      email: this.MentorLogin.value.email
    }

    this.service.login(result1).subscribe((data) => {
      this.res = data;
      if (this.res != undefined) {
        //console.log(this.res||JSON);
        if (this.res.role == 2 && this.res.active == true) {
          localStorage.setItem('mentor', this.res.id);
          localStorage.setItem('role', this.res.role);
          alert('Log in successfull');
          //console.log("Logged Successfully")
          this.id = this.res.id;
          //console.log(this.id);
          this.router.navigate(['mentor']);
        }
        else {
          alert("Invalid Email or Password");
        }
      }
    });


  }

  /* -----------------------USER LOGIN-------------------------- */

  res1;
  getId;
  onSubmit1(UserLogin?: FormGroup) {

    this.submitted = true;
    if (this.UserLogin.invalid) {
      return;
    }
    var result1 = {
      password: this.UserLogin.value.password,
      email: this.UserLogin.value.email
    }
    this.service.login(result1).subscribe((data) => {
      this.res = data;
      if (this.res != undefined) {
        //console.log(this.res||JSON);
        if (this.res.role == 1 && this.res.active == true) {
          alert('Logged in successfully');
          this.service.isUserLoggedIn = true;
          localStorage.setItem('role', this.res.role);
          localStorage.setItem('user', this.res.id);
          //console.log(localStorage.getItem('user'));
          this.router.navigate(['user']);
        }
      }
      else {
        alert("Invalid Email or Password");
      }
    });
  }


  /* ----------------------ADMIN LOGIN-------------------------- */


  res2;
  onSubmit3(AdminLogin?: FormGroup) {

    this.submitted = true;
    if (this.AdminLogin.invalid) {
      return;
    }
    var result1 = {
      password: this.AdminLogin.value.password,
      email: this.AdminLogin.value.email
    }

    this.service.login(result1).subscribe((data) => {
      this.res = data;
      if (this.res != undefined) {
        //console.log(this.res||JSON);
        if (this.res.role == 3 && this.res.active == true) {
          //alert(JSON.stringify(this.res));
          alert('Log In successfull');
          //console.log("Logged Successfully")
          this.router.navigate(['admin']);
          localStorage.setItem('role', this.res.role);
        }
        else {
          alert('Invalid Email or Password');
        }
      }
    });


  }

  /* ---------------------------------------------------------- */

}

