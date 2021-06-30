import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute} from '@angular/router';

import { HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import {RapportService} from 'src/app/rapport.service';


@Component({
  selector: 'app-details-rapport',
  templateUrl: './details-rapport.component.html',
  styleUrls: ['./details-rapport.component.css']
})
export class DetailsRapportComponent implements OnInit {
  public rapport:any;
 
  constructor(builder: FormBuilder,private http:HttpClient , private router:Router, private route : ActivatedRoute, private rapportService:RapportService) {
  
  }
  
 
  ngOnInit(): void {
    this.servicesUser();
  }
  servicesUser() {
    let idRapport =this.route.snapshot.params.id;
    console.log(idRapport);
    this.rapportService.getOneRapport(idRapport).subscribe(
      res => {
        console.log(res);
        let rapport=res;
        this.rapport=rapport;
      },
      err => {
        console.log(err);
      }

    )
  }

  

}

