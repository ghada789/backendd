import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdreService } from '../ordre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  public rapportForm:FormGroup;
  public _acceptedDemande: any;

  constructor(builder: FormBuilder, private http: HttpClient, private toastr: ToastrService,  private router: Router,private orderService:OrdreService,private route:ActivatedRoute) {
    let rapportControls={
      ordre: new FormControl("", [Validators.required]),
     date: new FormControl("", [Validators.required]),
     lieu: new FormControl("", [Validators.required]),
     personnel: new FormControl("", [Validators.required]),
      dureedu: new FormControl(""),
      dureea: new FormControl(""),
      moyens: new FormControl("",[Validators.required]),
      donnees: new FormControl("",[Validators.required]),

      observations: new FormControl("",[Validators.required])
    }
    this.rapportForm = builder.group(rapportControls)

   }
   get ordre() {return this.rapportForm.get('ordre')}
   get date() {return this.rapportForm.get('date')}
   get lieu() {return this.rapportForm.get('lieu')}
   get personnel() {return this.rapportForm.get('personnel')}
   get dureedu() {return this.rapportForm.get('dureedu')}
   get dureea() {return this.rapportForm.get('dureea')}
   get moyens() {return this.rapportForm.get('moyens')}
   get donnees() {return this.rapportForm.get('donnees')}
 
   get observations() {return this.rapportForm.get('observations')}

  ngOnInit(): void {
this.getAcceptedOrder()
//console.log(this._acceptedDemande)
  }
  rapportUser(){
   console.log(this.rapportForm)
      this.http.post<any>("http://localhost:3000/rapport/add", this.rapportForm.value)

      .subscribe(
        (result) => {
         // console.log(result.message);
         // this.router.navigateByUrl('/liste-rapport')
          this.toastr.success('Rapport envoyé');
          console.log(result.message);
          this.router.navigateByUrl('/dashboard')
        },
        (error) => {
          console.log(error);
          
        }
      )
    
    
    }

    getAcceptedOrder() {
      this.orderService.getAcceptedDemande().subscribe(
        response => {
          this._acceptedDemande = response.data
          console.log(this._acceptedDemande)
        },
        error => {
          console.log(error)
        }
      )
    }

// normalement l liste fergha fel base


}
