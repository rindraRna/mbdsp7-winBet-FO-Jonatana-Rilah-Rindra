import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../model/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  uri = "https://nodejsapitpt.herokuapp.com/api/type";

  constructor(
    private http: HttpClient
  ) { }

  getTypeByNom(nom: string):Observable<Type> {
    return this.http.get<Type>(this.uri+"/"+nom);
  }
}
