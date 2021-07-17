import { HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match_paris } from '../model/match_paris.model';
import { ChampionnatService } from '../shared/championnat.service';
import { MatchPariService } from '../shared/match-pari.service';

@Component({
  selector: 'app-match-championnat',
  templateUrl: './match-championnat.component.html',
  styleUrls: ['./match-championnat.component.css']
})
export class MatchChampionnatComponent implements OnInit{
  nomUtilisateur = "";
  nomChampionnat = ""
  matchs: Match_paris[];
  // Array of images
  slides = [{'image': '../assets/images/carousel/img1.jpg'}, {'image': '../assets/images/carousel/img2.jpg'},{'image': '../assets/images/carousel/img1.jpg'}];
  resourcesLoaded = true;

  constructor(
    private matchService: MatchPariService,
    private route: ActivatedRoute,
    private championnatService: ChampionnatService
  ) { 
  }

  ngOnInit(): void {
    this.nomUtilisateur = sessionStorage.getItem('nomUser');
    this.getChampionnat()
    this.getMatchsByChampionnat()
    setTimeout(() => { this.ngOnInit() }, 1000);
  }

  getChampionnat(){
    this.championnatService.getChampionnatById(this.route.snapshot.params.idChampionnat)
      .subscribe(data => {
        this.nomChampionnat = data.nom; 
      });
  }

  getMatchsByChampionnat(){
    this.matchService.getMatchsByChampionnat(this.route.snapshot.params.idChampionnat)
      .subscribe(data => {
        this.matchs = data; 
        this.resourcesLoaded = false;
      });
  }

}
