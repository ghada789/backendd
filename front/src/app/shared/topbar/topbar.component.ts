import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isLoggedIn:boolean;
  public isAdmin : Boolean
public isUser : Boolean

  constructor(private router: Router,private userService:UserService) { }


  ngOnInit(): void {
    this.isLoggedIn=this.userService.IsLoggedIn();
    const helper = new JwtHelperService();
    let token = localStorage.getItem("mytoken")
    const decodedToken = helper.decodeToken(token)
    if (decodedToken.role == "user") {
      this.isUser = true;
      this.isAdmin = false;
     
    }
    if (decodedToken.role == "admin") {
      this.isUser = false;
      this.isAdmin = true;
    
    }
  }
  logout() {
    localStorage.removeItem("mytoken")
    this.router.navigateByUrl('/login')
  }
}
