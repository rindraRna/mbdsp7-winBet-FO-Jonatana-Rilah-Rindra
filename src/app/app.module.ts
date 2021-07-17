import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailsMatchComponent } from './details-match/details-match.component';

import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {HttpClientModule} from '@angular/common/http';
import { MatchChampionnatComponent } from './match-championnat/match-championnat.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './utilisateur/login/login.component'
import { MatDialogModule } from '@angular/material/dialog';
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
import { PariComponent } from './pari/pari.component';
import { CompteComponent } from './utilisateur/compte/compte.component';
import { registerLocaleData } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import localeFr from '@angular/common/locales/fr';
import { InscriptionComponent } from './utilisateur/inscription/inscription.component';
import { MapComponent } from './map/map.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { QrCodeComponent } from './qr-code/qr-code.component';
registerLocaleData(localeFr);

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
  },
  {
    path:"inscription",
    component: InscriptionComponent
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
    DetailsPanierComponent,
    PariComponent,
    CompteComponent,
    InscriptionComponent,
    MapComponent,
    QrCodeComponent
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
    LeafletModule,
    ScrollingModule,
    MatCarouselModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
