import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Panier } from '../model/panier.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  produits = [];
  miseTotalValeur: number = 0;
  gainPotentielValeur: number = 0;
  uri = "https://nodejsapitpt.herokuapp.com/api/panier";

  constructor(
    private http: HttpClient
  ) { }

  getPanierByIdCompte(idCompte: string):Observable<Panier[]> {
    return this.http.get<Panier[]>(this.uri+"s/compte/"+idCompte);
  }

  creerPanier(panier: Panier):Observable<any> {
    return this.http.post(this.uri+"s", panier);
  }

  modifier(panier: Panier):Observable<any> {
    console.log("PANIER SERVICE - panier.gainTotal: "+panier.gainTotal);
    console.log("PANIER SERVICE - panier.miseTotal: "+panier.miseTotal);
    return this.http.put(this.uri+"s", panier);
  }

  getPanierById(id: string):Observable<Panier> {
    return this.http.get<Panier>(this.uri+"/"+id);
  }

  totalMiseEtGain(){
    var sommeMise = 0;
    var sommeGain = 0;
    var tailleProduits = this.produits.length;
    if(tailleProduits>0){
      for(var i = 0; i < tailleProduits; i++){
        sommeMise = sommeMise+this.produits[i].mise;
        sommeGain = sommeGain+this.produits[i].gain;
      }
      this.miseTotalValeur = Math.round(sommeMise*100)/100;
      this.gainPotentielValeur = Math.round(sommeGain*100)/100;
    }
    else{
      this.miseTotalValeur = 0;
      this.gainPotentielValeur = 0;
    }
  }

  ajouterProduit(produit){
    this.produits.push(produit);
  }

  getProduits(){
    return this.produits;
  }

  viderPanier(){
    this.produits = [];
    return this.produits;
  }

  supprimerProduit(produit){
    let index = this.produits.indexOf(produit);
    this.produits.splice(index, 1);
  }
}
