import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Panier } from 'src/app/model/panier.model';
import { CompteService } from 'src/app/shared/compte.service';
import { PanierService } from 'src/app/shared/panier.service';
import { SnackBarLoginSuccesComponent } from 'src/app/components/snack-bar/snack-bar-login-succes/snack-bar-login-succes.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "rindranyainaramiandrisoa@gmail.com";
  motDePasse = "rnaMdp";
  resourcesLoaded = false;
  message= ""

  constructor(
    private compteService: CompteService,
    public dialog: MatDialog,
    private panierService: PanierService,
    private snackBar: MatSnackBar,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  seConnecter(){
    this.resourcesLoaded = true;
    this.compteService.login(this.email, this.motDePasse)
    .subscribe( data => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('idUserConnecte', data.idCompte);
      this.compteService.getCompteById(data.idCompte)
      .subscribe( compte => {
        sessionStorage.setItem('nomUser', compte.nomUtilisateur);
        this.resourcesLoaded = false;
        this.snackBar.openFromComponent(SnackBarLoginSuccesComponent, {
          duration: 7000,
        });
        this.dialog.closeAll();
      });
    }, err => {
      this.message = "Erreur: "+err.error.message
      this.resourcesLoaded = false;
    });
  }

  versInscription(){
    this.router.navigate(['/inscription'])
    this.dialog.closeAll()
  }

}
