import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-liste-de-demande',
  templateUrl: './liste-de-demande.component.html',
  styleUrls: ['./liste-de-demande.component.css']
})
export class ListeDeDemandeComponent implements OnInit {
  public Alldemandes:any[]
  public demandes:any=[]
 

  constructor(private http:HttpClient) { }

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

  filter(value) {
    this.demandes = this.Alldemandes.filter((res) => { 
      return res.nom.toLowerCase().includes(value.toLowerCase())
    })
  }


}
