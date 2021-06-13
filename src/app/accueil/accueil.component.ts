import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match_paris } from '../model/match_paris.model';
import { MatchPariService } from '../shared/match-pari.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  idChampionnat = this.route.snapshot.params.idChampionnat;
  matchs: Match_paris[];
  // Array of images
  slides = [{'image': '../assets/images/carousel/img1.jpg'}, {'image': '../assets/images/carousel/img2.jpg'},{'image': '../assets/images/carousel/img1.jpg'}];
  resourcesLoaded = true;
  
  constructor(
    private matchService: MatchPariService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMacthsPariables()
  }

  getMacthsPariables(){
    this.matchService.getMatchsPariables()
      .subscribe(data => {
        this.matchs = data;     
        this.resourcesLoaded = false;   
      });
  }
}
