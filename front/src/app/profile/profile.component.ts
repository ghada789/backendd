import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { UserService } from '../user.service';
import { User } from '../component/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  public profileForm:FormGroup;


  constructor(builder:FormBuilder,private http:HttpClient,private router:Router ,private toastr: ToastrService,private route: ActivatedRoute,private userService:UserService) { 
  let profilecontrols ={

    firstname:new FormControl([
      Validators.required, Validators.pattern("[A-Za-z .'-]+"),
      Validators.minLength(2)]),
   lastname:new FormControl([
    Validators.required, Validators.pattern("[A-Za-z .'-]+"),
    Validators.minLength(2)]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    
   
  }
  this.profileForm=builder.group(profilecontrols)
  }
  get firstname() {return this.profileForm.get('firstname')}
   get lastname() {return this.profileForm.get('lastname')}
   get email() {return this.profileForm.get('email')}

  ngOnInit(): void {
    // let token = localStorage.getItem("mytoken");
// let t = JWT(token);
// const data = JSON.parse(JSON.stringify(t));
// console.log(typeof t)
// const id = data.id
// console.log(typeof data)
// console.log(id);
// this.http.get<any>('http://localhost:3000/user/currentUser/' + id)
  // .subscribe(
    // (result) => {
      // console.log(result);
      // const data = JSON.parse(JSON.stringify(result))
      // this.profileForm.patchValue({
        // firstname:data.firstname,lastname:data.lastname,email:data.email,
        // role:data.role
      // });
    // },
    // (error) => {
      // console.log(error);
    // }
    // 
  //  
  // )
  let idUser = this.route.snapshot.params.id;
    
  this.userService.getOneUser(idUser).subscribe(
    res=>{
      let user = res;
 
      this.profileForm.patchValue({
        firstname : user.firstname,
        lastname : user.lastname ,
        email : user.email,
        
        
      })
      
    },
    err=>{
      console.log('err');
    }
  )
  
}
updateUser(){
  let data = this.profileForm.value;
  let idUser = this.route.snapshot.params.id;
  let user = new User(data.firstname,data.lastname,data.email,data.password,null,idUser);

  this.userService.updateUser(user).subscribe(
    res=>{

      this.router.navigate(['/users/list']);
      this.toastr.success('modifier');
console.log(res.message);
    },
    err=>{
      console.log(err);
    }
  )

}

}





