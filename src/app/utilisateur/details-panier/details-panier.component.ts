import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PariPanier } from 'src/app/model/pari_panier.model';
import { CompteService } from 'src/app/shared/compte.service';
import { MatchPariService } from 'src/app/shared/match-pari.service';
import { PanierService } from 'src/app/shared/panier.service';
import { PariPanierService } from 'src/app/shared/pari-panier.service';

@Component({
  selector: 'app-details-panier',
  templateUrl: './details-panier.component.html',
  styleUrls: ['./details-panier.component.css']
})
export class DetailsPanierComponent implements OnInit {
  idPanier = this.route.snapshot.params.idPanier;
  nom = "";
  email = "";
  solde = 0;
  idUtilisateur = sessionStorage.getItem('idUserConnecte');
  date: Date;
  mise = 0;
  gain = 0;
  etat = "";
  pariPaniers: PariPanier[];
  resourcesLoaded = true;
  sommeGagne = 0;
  sommePerdu = 0;
  resultat = "";
  matchTermine: number;

  constructor(
    private route: ActivatedRoute,
    private compteService: CompteService,
    private panierService: PanierService,
    private pariPanierService: PariPanierService,
    private matchService: MatchPariService
  ) { }

  ngOnInit(): void {
    this.detailsCompte();
    this.getPanierById();
    this.getParisByIdPanier();
  }

  verifierMatchTermine(idMatch){
    console.log("idMatch: "+idMatch);
    this.matchService.getMatchById(idMatch)
    .subscribe( match => {
      console.log("etat: "+match.etat)
      if(match.etat == 2){
        return true;
      }
      else return false;
    });
  }

  resultatPari(etat): any{
    switch(etat){
      case 0: {
        return "Match non terminé";
      }
      case 1: {
        return "Gagné";
      }
      case 2: {
        return "Perdu";
      }
    }
  }

  detailsCompte(){
    this.compteService.getCompteById(this.idUtilisateur)
    .subscribe(compte => {
      this.nom = compte.nomUtilisateur;
      this.email = compte.email;
      this.solde = compte.solde;
    })
  }

  getPanierById(){
    this.panierService.getPanierById(this.idPanier)
    .subscribe(panier => {
      this.date = panier.date;
      this.mise = panier.miseTotal;
      this.gain = panier.gainTotal;
      this.etat = "";
    });
  }

  getParisByIdPanier(){
    this.resourcesLoaded = true;
    this.pariPanierService.getParisByIdPanier(this.idPanier)
    .subscribe(pariPaniers => {
      this.pariPaniers = pariPaniers;
      this.resourcesLoaded = false;
      const nbPari = pariPaniers.length;
      for(var i = 0; i < nbPari; i++){
        if(pariPaniers[i].pari.resultat == 1){
          this.sommeGagne += pariPaniers[i].pari.gain; 
        }
        if(pariPaniers[i].pari.resultat == 2){
          this.sommePerdu += pariPaniers[i].pari.mise;
        }
      }
      this.resultat = "Résultat: Vous avez gagné "+this.sommeGagne+" Ar et perdu "+this.sommePerdu+" Ar";
    });
  }

}
