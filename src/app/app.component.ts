import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Championnat } from './model/championnat.model';
import { ChampionnatService } from './shared/championnat.service';
import { MatchPariService } from './shared/match-pari.service';
import { LoginComponent } from './utilisateur/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  championnats: Championnat[];
  recherche = "";
  title = 'FO';
  nomUtilisateur = null;
  idUtilisateur = ""

  constructor(
    private championnatService: ChampionnatService,
    private router:Router,
    public dialog: MatDialog,
    private matchService: MatchPariService
  ) { }

  ngOnInit(): void {
    this.idUtilisateur = sessionStorage.getItem('idUserConnecte');
    this.getChampionnats()
    if(sessionStorage.getItem('nomUser') !== null){
      this.nomUtilisateur = sessionStorage.getItem('nomUser');
    } 
    setTimeout(() => { this.ngOnInit() }, 1000);
  }

  transmettreTexte(){
    var texteATrasmettre = this.recherche;  
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/recherche', texteATrasmettre])
    );
    this.recherche = "";
  }

  login(){
    this.dialog.open(LoginComponent);
  }

  deconnexion(){
    sessionStorage.removeItem('nomUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('idUserConnecte');
    sessionStorage.removeItem('idPanier');
    this.router.navigate(['/']).then(() => { 
      window.location.reload();
    });
  }

  getChampionnats(){
    this.championnatService.getChampionnats()
      .subscribe(data => {
        this.championnats = data;        
      });
  }

  macthsChampionnat(idChampionnat: string){
    // on navigue sur le meme component
    this.router.navigate(['/']).then(() => { 
      this.router.navigate(["/matchs/"+idChampionnat]); 
    });
  }
  
  menuToggle(){
    $.noConflict();
    "use strict";
    // Menu Trigger
    $('#menuToggle').on('click', function(event) {
      var windowWidth = $(window).width();   		 
      if (windowWidth<1010) { 
        $('body').removeClass('open'); 
        if (windowWidth<760){ 
          $('#left-panel').slideToggle(); 
        } else {
          $('#left-panel').toggleClass('open-menu');  
        } 
      } else {
        $('body').toggleClass('open');
        $('#left-panel').removeClass('open-menu');  
      } 
        
    }); 

    
    $(".menu-item-has-children.dropdown").each(function() {
      $(this).on('click', function() {
        var $temp_text = $(this).children('.dropdown-toggle').html();
        $(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>'); 
      });
    });

    // Load Resize 
    $(window).on("load resize", function(event) { 
      var windowWidth = $(window).width();  		 
      if (windowWidth<1010) {
        $('body').addClass('small-device'); 
      } else {
        $('body').removeClass('small-device');  
      } 
      
    });
  }

  ouvrirRecherche(){
    $('.search-trigger').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.search-trigger').parent('.header-left').addClass('open');
    });
  }

  fermerRecherche(){
    $('.search-close').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.search-trigger').parent('.header-left').removeClass('open');
    });
  }
}
