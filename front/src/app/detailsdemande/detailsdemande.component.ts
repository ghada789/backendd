import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/demande.service';
import { OffreService } from '../service/offre.service';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailsdemande',
  templateUrl: './detailsdemande.component.html',
  styleUrls: ['./detailsdemande.component.css']
})
export class DetailsdemandeComponent implements OnInit {
  public demande: any;
  public offre: any
  public id: any
  public emailDemandeur:any

  mail ={
    prixDemand:[],
    email:'',
    status:null
  }

  constructor(builder: FormBuilder, private http: HttpClient,
    private OffreService: OffreService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private demandeService: DemandeService) {

  }


  ngOnInit(): void {
    this.servicesUser();
    console.log(this.id)


  }


  servicesUser() {
    let idDemande = this.route.snapshot.params.id;
    this.id = idDemande
    console.log(idDemande);
    this.demandeService.getOneDemande(idDemande).subscribe(
      res => {
        console.log(res);
        let demande = res;
        this.demande = demande;
        this.emailDemandeur=demande.email;
        console.log(this.emailDemandeur)
      },
      err => {
        console.log(err);
      }

    )
  }

  getdetails(id: any): void {
    this.OffreService.getOffredetails(id).subscribe(
      response => {
        this.offre = response.data
       // console.log(this.offre);

      },
      error => {
        console.log(error)
      }
    )

  }



  sendAcceptedResponse(){
    const data={
      email:this.emailDemandeur,
      prixDemand:this.offre,
      status:1,
      idDemand:this.id
    };
    console.log(data)
    this.OffreService.sendOffre(data)
      .subscribe(
        data=>{
          this.toastr.success('demande accepter');
          console.log("data sent succefully !");
          console.log(data)
        },
        error=>{
          console.log(error);
        }
      );
  }
  sendRefusedResponse(){
    const data={
      idDemand:this.id,
      email:this.emailDemandeur,
      status:0
    };
    console.log(data)
    this.OffreService.sendOffre(data)
      .subscribe(
        data=>{
          this.toastr.success('demande refuser');
          console.log("data sent succefully !");
        },
        error=>{
          console.log(error);
        }
      );
  }
}

