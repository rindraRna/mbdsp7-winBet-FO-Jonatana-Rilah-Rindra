import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient
  ) { }

  coordonnees(lieu: string): Observable<any>{
    return this.http.get<any>("https://nominatim.openstreetmap.org/search?q="+lieu+"&format=json&addressdetails=1&limit=1&polygon_svg=1")
  }
}
