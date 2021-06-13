import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PariPanier } from '../model/pari_panier.model';

@Injectable({
  providedIn: 'root'
})
export class PariPanierService {
  uri = "https://winbet-api.herokuapp.com/api/pari_panier";

  constructor(
    private http: HttpClient
  ) { }

  ajoutParisDansPanier(pari_panier: PariPanier):Observable<any> {
    return this.http.post(this.uri+"s", pari_panier);
  }

  getParisByIdPanier(idPanier: string): Observable<PariPanier[]>{
    return this.http.get<PariPanier[]>(this.uri+"s/panier/"+idPanier);
  }
}
