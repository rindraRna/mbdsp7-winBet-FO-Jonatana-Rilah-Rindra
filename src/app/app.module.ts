import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailsMatchComponent } from './details-match/details-match.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {HttpClientModule} from '@angular/common/http';
import { MatchChampionnatComponent } from './match-championnat/match-championnat.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './utilisateur/login/login.component'
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SnackBarSuccesComponent } from './snack-bar/snack-bar-succes/snack-bar-succes.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarLoginSuccesComponent } from './snack-bar/snack-bar-login-succes/snack-bar-login-succes.component';
import { DetailsCompteComponent } from './utilisateur/details-compte/details-compte.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RechercheComponent } from './recherche/recherche.component';
import { QRCodeModule } from 'angular2-qrcode';
import { DetailsPanierComponent } from './utilisateur/details-panier/details-panier.component';

const routes:Routes = [
  {
    path:"",
    component: AccueilComponent
  },
  {
    path:"details/:idMatch",
    component: DetailsMatchComponent
  },
  {
    path:"matchs/:idChampionnat",
    component: MatchChampionnatComponent
  },
  {
    path:"compte/:idCompte",
    component: DetailsCompteComponent
  },
  {
    path:"recherche/:texte",
    component: RechercheComponent
  },
  {
    path:"panier/:idPanier",
    component: DetailsPanierComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DetailsMatchComponent,
    MatchChampionnatComponent,
    LoginComponent,
    SnackBarSuccesComponent,
    SnackBarLoginSuccesComponent,
    DetailsCompteComponent,
    RechercheComponent,
    DetailsPanierComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    QRCodeModule,
    MatCarouselModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
