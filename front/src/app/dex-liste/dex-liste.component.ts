import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dex-liste',
  templateUrl: './dex-liste.component.html',
  styleUrls: ['./dex-liste.component.css']
})
export class DexListeComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  // filter(value) {
    // this.demandes = this.Alldemandes.filter((res) => { 
      // return res.nom.toLowerCase().includes(value.toLowerCase())
    // })
  // }

}
