import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match_paris } from '../model/match_paris.model';
import { Pari } from '../model/pari.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {
  uri = "https://nodejsapitpt.herokuapp.com/api/pari";

  constructor(
    private http: HttpClient
  ) { }

  getPariByIdMatch(idMatch):Observable<Pari[]> {
    return this.http.get<Pari[]>(this.uri+"/match/"+idMatch);
  }

  getPariByIdMatchAndIdType(idMatch, idType):Observable<Pari[]> {
    return this.http.get<Pari[]>(this.uri+"/"+idMatch+"/"+idType);
  }  

  getPariByNomEtValeur(nom, valeur, paris: Pari[]){
    var tailleParis = paris.length;
    var indice = -1;
    for(var i = 0; i < tailleParis; i++){
      if(paris[i].type.nom === nom && paris[i].valeur === valeur){
        indice = i;
        break;
      }
    }
    return paris[indice];
  }

  verifierSiPariDuMemeType(typePari: string, valeur: string, idMatch: string, paris: Pari[]){
    var tailleParis = paris.length;
    if(tailleParis > 0){
      for(var i = 0; i < tailleParis; i++){
        if(typePari === paris[i].type.nom && valeur === paris[i].valeur && idMatch === paris[i].match._id){
          return true;
        }
      }
      return false;  
    }
    return false;
  }
}
