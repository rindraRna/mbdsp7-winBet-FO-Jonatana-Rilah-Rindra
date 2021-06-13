import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match_paris } from '../model/match_paris.model';

@Injectable({
  providedIn: 'root'
})
export class MatchPariService {
  uri = "https://winbet-api.herokuapp.com/api/match";

  constructor(
    private http: HttpClient
  ) { }

  getMatchs():Observable<Match_paris[]> {
    return this.http.get<Match_paris[]>(this.uri+"s");
  }  

  getMatchsPariables():Observable<Match_paris[]> {
    return this.http.get<Match_paris[]>(this.uri+"s/pariables");
  }  

  getMatchsByChampionnat(idChampionnat: string):Observable<Match_paris[]> {
    return this.http.get<Match_paris[]>(this.uri+"s/"+idChampionnat);
  }  

  getMatchById(id: string):Observable<Match_paris> {
    return this.http.get<Match_paris>(this.uri+"/"+id);
  }

  rechercheSimple(texte: string):Observable<Match_paris[]> {
    return this.http.get<Match_paris[]>(this.uri+"s/recherche/"+texte);
  }
}
