import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDtlService } from '../Services/user-dtl.service';

@Injectable({
  providedIn: 'root'
})
export class Gaurd1Guard implements CanActivate {
  data: any;

  constructor(private service: UserDtlService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    this.data = localStorage.getItem("role");

    //admin

    this.data = localStorage.getItem("role");
    if ( this.data == "3") {
      return true;
    } else {
      this.router.navigate(["index"]);
      return false;
    }



  }

}
