import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RapportService } from '../rapport.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-rapport',
  templateUrl: './list-rapport.component.html',
  styleUrls: ['./list-rapport.component.css']
})
export class ListRapportComponent implements OnInit {
  public Allrapports: any[]
  public rapports: any = []
  public intervention: any;
  public prixTotalIntervention: any
  public prixTotalSNG: any;
  public idIntervesion: any;
  public totPayer: any
  public emailDemandeur: any


  mail = {
    
    email: '',
   
  }

  constructor(private http: HttpClient, private toastr: ToastrService, private rapportService: RapportService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.display()
    this.getIdIntervention()
    console.log(this.idIntervesion)
  }


  display() {
    this.http.get<any>("http://localhost:3000/rapport/all")
      .subscribe(
        (result) => {
          this.rapports = result
          this.idIntervesion = result._id
          this.Allrapports = result
         // this.emailDemandeur = this.rapports.email;
          console.log(this.emailDemandeur)


          // console.log(result)

        },  //l'execution mte3ha tsiir automatiquement en cas de succés
        (error) => {
          console.log(error);
        }
      )

  }

  filter(value) {
    this.rapports = this.Allrapports.filter((res) => {
      return res.lieu.toLowerCase().includes(value.toLowerCase())
    })
  }

  getIdIntervention() {
    let id = this.route.snapshot.params.id;
    this.idIntervesion = id;
    console.log(this.idIntervesion);
    this.rapportService.getIntervensionById(id).subscribe(
      res => {
        console.log(res);
        this.intervention = res;
      },
      err => {
        console.log(err);
      }
    )
  }
  getIntervention(id: any) {
    this.rapportService.getRapportIntervention(id).subscribe(
      response => {

        this.intervention = response
        this.prixTotalIntervention = this.intervention.data.prixTotalIntervention;
        this.prixTotalSNG = this.intervention.data.prixTotalSNG
        console.log(this.prixTotalIntervention)
        console.log(this.prixTotalSNG)
        this.totPayer = this.prixTotalIntervention.totalPrix + this.prixTotalSNG.totalPrix
        console.log(this.totPayer)
      }
    ),
      error => {
        console.log(error)
      }
  }

  sendMailerIntervention() {
    let data = {
      email: this.mail.email,
      prixDemand: this.prixTotalSNG,
      prixTotalIntervention: this.prixTotalIntervention,
      total: this.totPayer
    }
    //console.log(this.emailDemandeur);
    console.log("Hello Data Houssem", data)
    this.rapportService.sendIntervention(data).subscribe(
      data => {
        this.toastr.success('Facture envoyé avec succès');
        console.log("data sent succefully !");
       

      },
      error => {
        console.log(error);
      }
    )

  }

}
 
 
 

