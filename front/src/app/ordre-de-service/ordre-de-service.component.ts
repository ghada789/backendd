import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/demande.service';
import { OrdreService } from '../ordre.service';



@Component({
  selector: 'app-ordre-de-service',
  templateUrl: './ordre-de-service.component.html',
  styleUrls: ['./ordre-de-service.component.css']
})
export class OrdreDeServiceComponent implements OnInit {
  public demande: any;
  _acceptedDemande: any;

  constructor(builder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private demandeService: DemandeService, private orderService: OrdreService) { }

  ngOnInit(): void {
    this.servicesUser();
  }
  
  servicesUser() {
    let idDemande = this.route.snapshot.params.id;
    console.log(idDemande);
    this.demandeService.getOneDemande(idDemande).subscribe(
      res => {
        console.log(res);
        let demande = res;
        this.demande = demande;
      },
      err => {
        console.log(err);
      }
    )
  }
  getAcceptedOrder() {
    this.orderService.getAcceptedDemande().subscribe(
      response => {
        this._acceptedDemande = response
        console.log(this._acceptedDemande)
      },
      error => {
        console.log(error)
      }
    )
  }

}
