import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte.model';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  uri = "https://nodejsapitpt.herokuapp.com/api/compte";

  constructor(
    private http: HttpClient
  ) { }

  getCompteById(id: string):Observable<Compte> {
    return this.http.get<Compte>(this.uri+"/"+id);
  }

  login(email, motDePasse):Observable<any> {
    return this.http.post(
      this.uri+"/login", 
      { 
        email: email,
        motDePasse: motDePasse 
      });
  }

  decaisser(idCompte, montant):Observable<any> {
    return this.http.put(
      this.uri+"/decaisser", 
      { 
        id: idCompte,
        montant: montant 
      });
  }
}
