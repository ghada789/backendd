import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import JWT from "jwt-decode";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-sngfeed',
  templateUrl: './sngfeed.component.html',
  styleUrls: ['./sngfeed.component.css']
})

export class SngfeedComponent implements OnInit {
  public sngfeedForm: FormGroup;
  /* public demande={
    pays:""
    
  } */
  datetoday: any;
  minDate = (new Date()).toISOString().substring(0, 10)
  public errHoursMsg = ""

  constructor(builder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService, private datePipe: DatePipe) {
    let sngfeedControls = {
      nom: new FormControl("", [Validators.required]),
      prenom: new FormControl("", [Validators.required]),
    email: new FormControl(""),
      telephone: new FormControl("", [Validators.required]),
      lieu: new FormControl("", [Validators.required]),
      service: new FormControl(""),
      capacite: new FormControl(""),
      date_debut: new FormControl((new Date()).toISOString().substring(0, 10)),
      date_fin: new FormControl("", [Validators.required]),
      heure_debut: new FormControl(""),
      heure_fin: new FormControl(""),
      moyen: new FormControl(""),
      gouvernorat: new FormControl(""),
      objet: new FormControl("")

    }
    var myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.datetoday = myDate
    this.sngfeedForm = builder.group(sngfeedControls)
  }
  get nom() { return this.sngfeedForm.get('nom') }
  get prenom() { return this.sngfeedForm.get('prenom') }
  get email() { return this.sngfeedForm.get('email') }
  get telephone() { return this.sngfeedForm.get('telephone') }
  get lieu() { return this.sngfeedForm.get('lieu') }
  get service() { return this.sngfeedForm.get('service') }
  get capacite() { return this.sngfeedForm.get('capacite') }
  get date_debut() { return this.sngfeedForm.get('date_debut') }
  get date_fin() { return this.sngfeedForm.get('date_fin') }
  get heure_debut() { return this.sngfeedForm.get('heure_debut') }
  get heure_fin() { return this.sngfeedForm.get('heure_fin') }
  get moyen() { return this.sngfeedForm.get('moyen') }
  get gouvernorat() { return this.sngfeedForm.get('gouvernorat') }
  get objet() { return this.sngfeedForm.get('objet') }


  ngOnInit(): void {
    let token = localStorage.getItem("mytoken");
    let t = JWT(token);
    const data = JSON.parse(JSON.stringify(t));
    console.log(typeof t)
    const id = data.id
    console.log(typeof data)
    console.log(id);
    this.http.get<any>('http://localhost:3000/user/currentUser/' + id)
      .subscribe(
        (result) => {
          console.log(result);
          const data = JSON.parse(JSON.stringify(result))
          this.sngfeedForm.patchValue({
            nom: data.firstname, prenom: data.lastname,
            email: data.email
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  changeType(e) {
    console.log(e.target.value);
  }

  sngfeedUser() {

    let token = JWT(localStorage.getItem("mytoken"));
    const decodedToken = JSON.parse(JSON.stringify(token));

    let idDemandeur = decodedToken.id;

    let data = this.sngfeedForm.value
    data.idDemandeur = idDemandeur

    // let errHours = Date.parse('01/01/2021'+data.heure_debut+':00') < Date.parse('01/01/2021'+data.heure_fin+':00');
    // 

    // console.log(errHours);
    // console.log(data.heure_debut);
    // console.log(data.heure_fin);
    // 
    // if (!errHours) {
      // this.errHoursMsg = "Erreur"
    // } else {

      this.http
        .post<any>("http://localhost:3000/demande/sngfeed", data)
        .subscribe(
          (result) => {
            this.toastr.success('Demande envoyée');
            console.log(result.message);
            this.router.navigateByUrl('/dashboard')
          },
          (error) => {
            console.log(error);
          }
        )

    }

  }


