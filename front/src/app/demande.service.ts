import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demande } from './component/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private addDemandeUrl="http://localhost:3000/demande/sngfeed";
  private getOneDemandeUrl="http://localhost:3000/demande/one/";

private deleteDemandeUrl="http://localhost:3000/demande/remove/";



  constructor(private http:HttpClient) { }

  getAllDemandes(){
    let data= this.http.get<any>("http://localhost:3000/demande/all");
    return data;
  }
  getOneDemande(id:string){
    return this.http.get<any>(this.getOneDemandeUrl+id)
  }
  
  addDemande(demande:Demande){
    return this.http.post<any>(this.addDemandeUrl,demande);
  }
  
  
  
  deleteDemande(id:string)
  {
    return this.http.delete<any>(this.deleteDemandeUrl+id);
  }
}
