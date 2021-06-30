import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users: any [] = [];
    userDelete;
    usersList:any[]=[];
    dialog: any;
    constructor(private userService:UserService,private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.getAllUsers();
    }
  
    deleteRow(event) {
      this.userDelete = event;
    } 
  
    delete(user){
      let index = this.usersList.indexOf(user);
      this.usersList.splice(index,1);
      this.userService.deleteUser(user._id)
      .subscribe(
       res => {
         console.log(res);
         this.toastr.error('Supprimer');
       },
       err => {
         console.log(err);
       }
    
     )
     document.getElementById("closeModalButton").click();
    }
  
    getAllUsers(){
      this.usersList=[];
  
      this.userService.getAllUsers().subscribe(
        result =>{
          this.usersList=result;
          this.users = result;
        },
        error =>{
          console.log(error);
        }
      )
    }
    
    filter(value) {
      console.log(value);
      if (value != null || value != '' ) {
        this.usersList=[];
        this.usersList = this.users.filter((ct) => { 
          return ct.lastname.toLowerCase().includes(value.toLowerCase())
        })
      } else{
        this.usersList=[];
        this.usersList=this.users;
      }
      
  


 

}}
