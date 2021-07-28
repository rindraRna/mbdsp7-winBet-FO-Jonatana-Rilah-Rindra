import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/shared/compte.service';
import { PariPanierService } from 'src/app/shared/pari-panier.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  idUtilisateur = sessionStorage.getItem('idUserConnecte');
  nom = "";
  email = "";
  solde = 0;
  nbPari = 0;

  constructor(
    private compteService: CompteService,
    private pariPanierService: PariPanierService
  ) { }

  ngOnInit(): void {
    if(this.idUtilisateur !== null){
      this.detailsCompte()
      this.nombrePari();
    }
  }

  nombrePari(){
    this.pariPanierService.getNbPariByIdUtilisateur(this.idUtilisateur)
    .subscribe( data => {
      this.nbPari = data.resultat
    })
  }

  detailsCompte(){
    this.compteService.getCompteById(this.idUtilisateur)
    .subscribe(compte => {
      this.nom = compte.nomUtilisateur;
      this.email = compte.email;
      this.solde = compte.solde;
    })
  }

}
