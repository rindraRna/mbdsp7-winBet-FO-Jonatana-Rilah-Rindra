import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match_paris } from '../model/match_paris.model';
import { MatchPariService } from '../shared/match-pari.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  texte = this.route.snapshot.params.texte;
  matchs: Match_paris[];
  // Array of images
  slides = [{'image': '../assets/images/carousel/img1.jpg'}, {'image': '../assets/images/carousel/img2.jpg'},{'image': '../assets/images/carousel/img1.jpg'}];
  resourcesLoaded = true;
  nbResultats = 0;
  
  constructor(
    private matchService: MatchPariService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMacthsRecherches()
  }

  getMacthsRecherches(){
    this.matchService.rechercheSimple(this.texte)
      .subscribe(data => {
        this.nbResultats = data.length;
        this.matchs = data;     
        this.resourcesLoaded = false;   
      });
  }
}
