import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
public Url ="http://localhost:3000/factures"
  constructor(private http: HttpClient) {

   }


  getOffredetails(id:any){
    return this.http.get<any>(`${this.Url}/${id}`)
  }

  sendOffre(mail:any){
    return this.http.post("http://localhost:3000/sender/sendMail",mail)
  }
  

}
