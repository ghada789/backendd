import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DemandeService } from 'src/app/demande.service';

@Component({
  selector: 'app-ordre',
  templateUrl: './ordre.component.html',
  styleUrls: ['./ordre.component.css']
})
export class OrdreComponent implements OnInit {
  public Alldemandes:any[]
  public demandes:any=[]
  
  constructor(private http:HttpClient, private demandeService:DemandeService) { }
  ngOnInit(): void {
    this.display()
  }
display(){
  this.http.get<any>("http://localhost:3000/demande/all")
  .subscribe(
    (result) => {
      this.demandes = result
      this.Alldemandes = result
  

    },  //l'execution mte3ha tsiir automatiquement en cas de succés
    (error) => {
      console.log(error);
    }
  )

}
delete(d){
  let index=this.demandes.indexOf(d);
  this.demandes.splice(index,1);
  this.demandeService.deleteDemande(d._id).subscribe(
    res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    }
  )
}

  filter(value) {
    this.demandes = this.Alldemandes.filter((res) => { 
      return res.nom.toLowerCase().includes(value.toLowerCase())
    })
  }


 
 

}
