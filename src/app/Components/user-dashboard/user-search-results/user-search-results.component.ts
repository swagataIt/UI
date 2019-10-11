import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { FormGroup,ReactiveFormsModule } from '@angular/forms';
import { UserDtlService }from '../../../Services/user-dtl.service';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.css']
})
export class UserSearchResultsComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:UserDtlService,private router: Router) { }

  Search:FormGroup;
  skillData;


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
  onPropose(Id)
  {
    const data={
      trainingId:Id,
      trainingName:this.Search.value.technology
    }
    console.log('data passed to propose ');
    this.router.navigate(['/user/propose-training'],{queryParams:data});
  }

}
