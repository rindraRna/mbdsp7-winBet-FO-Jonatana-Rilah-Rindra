import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Panier } from '../../model/panier.model';
import { Pari } from '../../model/pari.model';
import { PariPanier } from '../../model/pari_panier.model';
import { CompteService } from '../../shared/compte.service';
import { PanierService } from '../../shared/panier.service';
import { PariPanierService } from '../../shared/pari-panier.service';
import { PariService } from '../../shared/pari.service';
import { SnackBarSuccesComponent } from '../snack-bar/snack-bar-succes/snack-bar-succes.component';
import { LoginComponent } from '../utilisateur/login/login.component';

@Component({
  selector: 'app-pari',
  templateUrl: './pari.component.html',
  styleUrls: ['./pari.component.css']
})
export class PariComponent implements OnInit {
  produits: Pari[] = this.panierService.getProduits();
  @Input() miseTotalValeur
  @Input() gainPotentielValeur
  resourcesLoaded = false;
  dansDetails = false;
  grise = false

  constructor(
    private panierService: PanierService,
    private compteService: CompteService,
    private pariPanierService: PariPanierService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private pariService: PariService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url.startsWith("/details")) {
      this.dansDetails = true;     
    }
  }

  viderPanier(){
      window.location.reload();
  }

  supprimerDuPanier(titre, valeur){
    //supprimer dans panier
    var pari = this.pariService.getPariByNomEtValeur(titre, valeur, this.produits);
    this.panierService.supprimerProduit(pari);

    // maj mise total et gain potentiel
    this.majMiseEtGain();
  }

  enregistrerDansPanier(){
    if(this.produits.length>0){
      const token = sessionStorage.getItem('token');
      console.log("token: "+token);
      if(token !== null ){
        this.compteService.getCompteById(sessionStorage.getItem('idUserConnecte'))
        .subscribe( compte => {
          if(compte.solde > this.miseTotalValeur){
            this.resourcesLoaded = true;
            var nbProduit = this.produits.length;
            this.compteService.getCompteById(sessionStorage.getItem('idUserConnecte'))
            .subscribe( compte => {
              var panier = new Panier();
              panier.compte = compte;
              panier.date = new Date();
              panier.gainTotal = 0;
              panier.miseTotal = 0;
              panier.qrCode = "";
              this.panierService.creerPanier(panier)
              .subscribe( data => {
                var idPanier = data.message;
                this.panierService.getPanierById(idPanier)
                .subscribe( panier => {
                  for(var i = 0; i < nbProduit; i++){
                    var pariPanier = new PariPanier();
                    pariPanier.pari = this.produits[i];
                    pariPanier.panier = panier;
                    this.pariPanierService.ajoutParisDansPanier(pariPanier)
                    .subscribe();
                  }
                  // modification mise et gain total panier
                  panier.gainTotal = this.gainPotentielValeur;
                  panier.miseTotal = this.miseTotalValeur;
                  this.panierService.modifier(panier)
                  .subscribe( () => {
                    console.log("sessionStorage.getItem('idUserConnecte'): "+sessionStorage.getItem('idUserConnecte'))
                    // decaisser compte
                    this.compteService.decaisser(sessionStorage.getItem('idUserConnecte'), this.miseTotalValeur)
                    .subscribe( () => {
                      this.snackBar.openFromComponent(SnackBarSuccesComponent, {
                        duration: 5000,
                      });
                      this.resourcesLoaded = false;
                    });
                  });
                });
              });
            });
          }
          else{
            alert("Erreur: Votre solde est insuffisant")
          }
        });
      }                        
      else{
        this.dialog.open(LoginComponent);
      }
    }
    else{
      alert("Faites un pari avant de valider le panier");
    }
  }

  majMiseEtGain(){
    // this.panierService.totalMiseEtGain();

    var sommeMise = 0;
    var sommeGain = 0;
    var tailleProduits = this.produits.length;
    if(tailleProduits>0){
      for(var i = 0; i < tailleProduits; i++){
        sommeMise = sommeMise+this.produits[i].mise;
        sommeGain = sommeGain+this.produits[i].gain;
      }
      this.miseTotalValeur = this.deuxChiffresDecimal(sommeMise);
      this.gainPotentielValeur = this.deuxChiffresDecimal(sommeGain);
    }
    else{
      this.miseTotalValeur = 0;
      this.gainPotentielValeur = 0;
    }
  }

  calculGain(event, pari){
    pari.mise = +event.target.value;
    if(pari.mise <= 0) {
      alert("Votre mise doit être supérieur à 0")
      this.grise = true
    }
    else{
      // 2 chiffres apres virgules
      pari.gain = this.deuxChiffresDecimal(pari.mise*pari.cote);
  
      // maj mise total et gain potentiel
      this.majMiseEtGain();

      this.grise = false
    }
  }

  deuxChiffresDecimal(nombre: number){
    return Math.round(nombre*100)/100;
  }

}
