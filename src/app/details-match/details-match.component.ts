import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Match_paris } from '../model/match_paris.model';
import { Panier } from '../model/panier.model';
import { Pari } from '../model/pari.model';
import { PariPanier } from '../model/pari_panier.model';
import { CompteService } from '../shared/compte.service';
import { MatchPariService } from '../shared/match-pari.service';
import { PanierService } from '../shared/panier.service';
import { PariPanierService } from '../shared/pari-panier.service';
import { PariService } from '../shared/pari.service';
import { TypeService } from '../shared/type.service';
import { SnackBarSuccesComponent } from '../snack-bar/snack-bar-succes/snack-bar-succes.component';
import { LoginComponent } from '../utilisateur/login/login.component';

@Component({
  selector: 'app-details-match',
  templateUrl: './details-match.component.html',
  styleUrls: ['./details-match.component.css']
})
export class DetailsMatchComponent implements OnInit {
  nomUtilisateur = ""
  produits: Pari[] = this.panierService.getProduits();
  titres = ["Vainqueur", "Les deux équipes marquent"];
  miseTotalValeur: number = this.panierService.miseTotalValeur;
  gainPotentielValeur: number = this.panierService.gainPotentielValeur;
  match: Match_paris;
  idMatch = this.route.snapshot.params.idMatch;
  parisVainqueurs: Pari[]
  parisMarques: Pari[]
  resourcesLoaded = true;

  constructor(
    private panierService: PanierService,
    private pariService: PariService,
    private matchService: MatchPariService,
    private typeService: TypeService,
    private route: ActivatedRoute,
    public dialog: MatDialog
    // private pariPanierService: PariPanierService,
    // private snackBar: MatSnackBar,
    // private compteService: CompteService
  ) { }

  ngOnInit(): void {
    this.nomUtilisateur = sessionStorage.getItem('nomUser');
    this.getMatchById();
    var nbTypeParis = this.titres.length
    for(var i = 0; i < nbTypeParis; i++){
      this.afficherParis(i)
    }
    setTimeout(() => { this.ngOnInit() }, 1000);
  }

  afficherParis(index){
    this.typeService.getTypeByNom(this.titres[index])
    .subscribe(data => {
      var idType = data._id
      switch(index){
        case 0: {
          this.pariService.getPariByIdMatchAndIdType(this.idMatch, idType)
          .subscribe(data => {
            this.parisVainqueurs = data; 
          });
          break
        }
        case 1:{
          this.pariService.getPariByIdMatchAndIdType(this.idMatch, idType)
          .subscribe(data => {
            this.parisMarques = data; 
          });
          break
        }
      }
    });
  }

  getMatchById(){
    this.matchService.getMatchById(this.idMatch)
    .subscribe(data => {
      this.match = data; 
      this.resourcesLoaded = false;
    });
  }

  majMiseEtGain(){
    this.panierService.totalMiseEtGain();

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
    // 2 chiffres apres virgules
    pari.gain = this.deuxChiffresDecimal(pari.mise*pari.cote);

    // maj mise total et gain potentiel
    this.majMiseEtGain();
  }

  pari(event, indiceTitre){
    // gestion panier
    var btnClique = event.srcElement;
    if(btnClique instanceof HTMLButtonElement){
      // this.toggle = !this.toggle;
      // console.log("toggle2: "+this.toggle);
      // console.log("evt: "+btnClique.click);
      // recuperer valeur et cote
      var texte = btnClique.innerText;
      var tailleTexte = texte.length
      var split = texte.split(" ");
      var cote = split[(split.length-1)];
      var valeur = texte.substring(0, (tailleTexte-cote.length-1));

      // if(btnClique.style.backgroundColor === "rgb(251, 189, 0)"){
      //   // changement couleur btn
      //   btnClique.style.backgroundColor = "white";
      //   btnClique.style.color = "#607d8b";
      //   btnClique.style.fontWeight = "normal";

      //   //supprimer dans panier
      //   var pari = this.pariService.getPariByNomEtValeur(this.titres[indiceTitre], valeur, this.produits);
      //   this.panierService.supprimerProduit(pari);

      //   // maj mise total et gain potentiel
        // this.majMiseEtGain();

      // }
      // else{
        this.typeService.getTypeByNom(this.titres[indiceTitre])
        .subscribe(type => {
          // changement couleur btn
          // btnClique.style.backgroundColor = "rgb(251, 189, 0)";
          // btnClique.style.color = "#3C3C3C";
          // btnClique.style.fontWeight = "bold";

          //ajout dans panier
          var pari = new Pari();
          pari.match = this.match          
          pari.type= type;
          pari.valeur = valeur;
          pari.cote = +cote;
          pari.mise = +200;
          // 2 chiffres apres virgules
          pari.gain = this.deuxChiffresDecimal(pari.mise*pari.cote); 
          pari.resultat = 0;
          // verification s il y a deja un pari de meme type
          if(!this.pariService.verifierSiPariDuMemeType(this.titres[indiceTitre], valeur, this.match._id, this.produits)){
            this.panierService.ajouterProduit(pari);

            // maj mise total et gain potentiel
            this.majMiseEtGain();
          }
          else{
            alert("Vous avez déjà parié le même pari");
          }
        });  
      // }
    }
  }

  deuxChiffresDecimal(nombre: number){
    return Math.round(nombre*100)/100;
  }
}
