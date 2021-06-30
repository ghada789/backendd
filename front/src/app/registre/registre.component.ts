import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { User } from '../component/user';



@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {
  public registreForm:FormGroup;

  constructor(builder:FormBuilder,private http:HttpClient,private router:Router,private route: ActivatedRoute,private toastr: ToastrService,private userService:UserService ) {
    let registrecontrols ={
    firstname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[A-Z a-z 'éç]*")]),
   lastname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[A-Z a-z 'éç]*")]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    repassword:new FormControl("",[Validators.required,Validators.minLength(8)]) 
  }
  this.registreForm=builder.group(registrecontrols)
  }
  get firstname() {return this.registreForm.get('firstname')}
   get lastname() {return this.registreForm.get('lastname')}
   get email() {return this.registreForm.get('email')}
   get password() {return this.registreForm.get('password')}
   get repassword() {return this.registreForm.get('repassword')}


  ngOnInit(): void {
  
    let isLoggedIn=this.userService.IsLoggedIn();
  if (isLoggedIn)
{
  this.router.navigate(['/dashboard']);
}

  }
  registreUser(){
   //console.log(this.registreForm.value);
    let data= this.registreForm.value;
    let user= new User(data.firstname,data.lastname,data.email,data.password,null,null)
    this.userService.registreAdmin(user)
    .subscribe(
      (result) => {
       console.log(result.message);
        this.toastr.success("Utilisateur enregistré");
        this.router.navigateByUrl('/login')
      },
      (error) => {
       
        this.toastr.error('Utilisateur déja existe');
      }
    )
  }
}
