import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDtlService } from '../Services/user-dtl.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data: any;

  constructor(private service: UserDtlService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    this.data = localStorage.getItem('role');


    if (!this.service.isLoggedIn()) {
      return true;
    } else {
      if (this.data === "3") {
        console.log(this.data);
        this.router.navigate(["admin"]);
        return false;
      } else if (this.data === "2") {
        console.log(this.data);
        this.router.navigate(["mentor"]);
        return false;
      } else if (this.data == '1') {
        console.log(this.data);
        this.router.navigate(["user"]);
        return false;
      }
      return false;

    }

  }
}