import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PariPanier } from '../model/pari_panier.model';

@Injectable({
  providedIn: 'root'
})
export class PariPanierService {
  uri = "https://nodejsapitpt.herokuapp.com/api/pari_panier";
  // uri = "http://localhost:8010/api/pari_panier";

  constructor(
    private http: HttpClient
  ) { }

  qrCode(idPanier: string): Observable<any>{
    return this.http.get<any>(this.uri+"/qrCode/"+idPanier);
  }  

  getNbPariByIdUtilisateur(idUtilisateur: string): Observable<any>{
    return this.http.get<any>(this.uri+"/compte/"+idUtilisateur);
  }

  ajoutParisDansPanier(pari_panier: PariPanier):Observable<any> {
    return this.http.post(this.uri+"s", pari_panier);
  }

  getParisByIdPanier(idPanier: string): Observable<PariPanier[]>{
    return this.http.get<PariPanier[]>(this.uri+"s/panier/"+idPanier);
  }
}
