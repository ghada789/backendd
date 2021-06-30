import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rapport } from './component/rapport';
@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private addRapportUrl="http://localhost:3000/rapport/add";
  private getOneRapportUrl="http://localhost:3000/rapport/one/";
  constructor(private http:HttpClient) { }
  getAllRapports(){
    let data= this.http.get<any>("http://localhost:3000/rapport/all");
    return data;
  }
  getOneRapport(id:string){
    return this.http.get<any>(this.getOneRapportUrl+id)
  }
    
  addRapport(rapport:Rapport){
    return this.http.post<any>(this.addRapportUrl,rapport);
  }

  getIntervensionById(id:any){
    return this.http.get("http://localhost:3000/factures/demands/intervention/"+id)

  }

   getRapportIntervention(id:any){
    return this.http.get("http://localhost:3000/factures/demands/acceptedDemand/"+id)
  }

  sendIntervention(body:any){
    return this.http.post("http://localhost:3000/sender/sendFinalFacturation",body)
  }  
}
