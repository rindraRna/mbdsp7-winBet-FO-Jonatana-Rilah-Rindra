import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PariPanier } from 'src/app/model/pari_panier.model';
import { CompteService } from 'src/app/shared/compte.service';
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
  resourcesLoaded = true

  constructor(
    private route: ActivatedRoute,
    private compteService: CompteService,
    private panierService: PanierService,
    private pariPanierService: PariPanierService
  ) { }

  ngOnInit(): void {
    this.detailsCompte();
    this.getPanierById();
    this.getParisByIdPanier();
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
    });
  }

}
