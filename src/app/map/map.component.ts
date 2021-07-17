import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map
  @Input() stade
  @Input() endroit

  constructor(
    private mapService: MapService
  ) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 
    this.initMap();
  }

  private initMap(): void {
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    this.mapService.coordonnees(this.stade).subscribe(data => {
      this.map = L.map('map', {
        center: [data[0].lat, data[0].lon],
        zoom: 17
      });
  
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 5,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  
      tiles.addTo(this.map);

      L.marker([data[0].lat, data[0].lon], {icon: myIcon}).bindPopup(this.stade+" ( "+this.endroit+" )").addTo(this.map).openPopup();
    }, err => {
      alert("Aucun coordonnée trouvé pour le stade")
      L.marker([-18.9100122,47.5255809], {icon: myIcon}).bindPopup('Antananarivo').addTo(this.map).openPopup();
    })
  
  }
}
