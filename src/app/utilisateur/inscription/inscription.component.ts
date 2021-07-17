import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompteService } from 'src/app/shared/compte.service';
import { SnackBarLoginSuccesComponent } from 'src/app/snack-bar/snack-bar-login-succes/snack-bar-login-succes.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  identifiant = ""
  email = ""
  motDePasse = ""
  message = ""
  resourcesLoaded = false
  // Array of images
  slides = [{'image': '../assets/images/carousel/img1.jpg'}, {'image': '../assets/images/carousel/img2.jpg'},{'image': '../assets/images/carousel/img1.jpg'}];
  
  constructor(
    private compteService: CompteService,
    private snackBar: MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  inscription(){
    this.resourcesLoaded = true
    this.compteService.inscription(this.email, this.identifiant, this.motDePasse)
    .subscribe(data => {
      this.compteService.login(this.email, this.motDePasse)
      .subscribe( dataLogin => {
        sessionStorage.setItem('token', dataLogin.token);
        sessionStorage.setItem('idUserConnecte', dataLogin.idCompte);
        sessionStorage.setItem('nomUser', data.compte.nomUtilisateur);
        this.snackBar.openFromComponent(SnackBarLoginSuccesComponent, {
          duration: 7000,
        });
        this.router.navigate(['/']);
      })
    }, err => {
      this.message = "Erreur: "+err.error.message
      this.resourcesLoaded = false
    }
  )}

}
