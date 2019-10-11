import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDtlService } from '../Services/user-dtl.service';

@Injectable({
  providedIn: 'root'
})
export class Gaurd2Guard implements CanActivate {
  data: string;
  constructor(private router: Router, private auth: UserDtlService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // trainer

    this.data = localStorage.getItem("role");
    if (this.data == "2") {
      return true;
    } else {
      this.router.navigate(["index"]);
      return false;
    }

  }
}
