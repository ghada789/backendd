import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from "@angular/router"
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private userService:UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLoggedIn=this.userService.IsLoggedIn();
      if(isLoggedIn){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
      // let token = localStorage.getItem("mytoken")

    // if (!token) {
      // this.router.navigateByUrl('/login')
      // return false;
    // } else {
    // return true;
  // }
}
  
}
