import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ordre} from './component/ordre';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdreService {
  private addOrdreUrl="http://localhost:3000/ordre/ordreservice";
  private getOneOrdreUrl="http://localhost:3000/ordre/one/";

  constructor(private http:HttpClient) { }

getAllOrdres(){
  let data= this.http.get<any>("http://localhost:3000/ordre/all");
  return data;
}
getOneOrdre(id:string){
  return this.http.get<any>(this.getOneOrdreUrl+id)
}

addOrdre(ordre:Ordre){
  return this.http.post<any>(this.addOrdreUrl,ordre);
}

getAcceptedDemande():Observable<any>{
return this.http.get<any>("http://localhost:3000/factures/demands/acceptedDemands");  
}
}