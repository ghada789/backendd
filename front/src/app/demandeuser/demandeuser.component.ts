import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import JWT from "jwt-decode";
@Component({
  selector: 'app-demandeuser',
  templateUrl: './demandeuser.component.html',
  styleUrls: ['./demandeuser.component.css']
})
export class DemandeuserComponent implements OnInit {
  public demandes:any=[]
 
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  display(){
    let token = localStorage.getItem("mytoken");
    let t = JWT(token);
    const data = JSON.parse(JSON.stringify(t));
    console.log(typeof t);
    let email=data.email;
    console.log(email)

    this.http.get<any>("http://localhost:3000/demande/emailuser/"+email)
    .subscribe(
      (result) => {
        this.demandes = result
       
    
  
      },  //l'execution mte3ha tsiir automatiquement en cas de succés
      (error) => {
        console.log(error);
      }
    )
  
  }
  
}

