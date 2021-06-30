import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { User } from '../component/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm:FormGroup;
  constructor(builder:FormBuilder, private http:HttpClient,private router:Router,private toastr: ToastrService,private userService:UserService) {
    let logincontrols={
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required]),

    }
    this.loginForm=builder.group(logincontrols)
  
   }
   get email() {return this.loginForm.get('email')}
   get password() {return this.loginForm.get('password')}

  ngOnInit(): void {

    let isLoggedIn=this.userService.IsLoggedIn();
  if (isLoggedIn)
{
  this.router.navigate(['/dashboard']);
}

  }
  loginUser(){
    var data= this.loginForm.value;
    console.log(data)
 //let user= new User("","",data.email,data.password,"","")
 this.userService.loginAdmin(data)
   
    .subscribe(
      result => {
       
        let token=result.token;
        localStorage.setItem("mytoken",token);
      this.router.navigateByUrl('/dashboard')
      },
      error => {
        console.log(error);
        this.toastr.error("Le mot de passe entré est incorrect");
      }
    )
  }
 

}


