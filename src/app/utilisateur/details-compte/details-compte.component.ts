import { Component, OnInit, ViewChild } from '@angular/core';
import { CompteService } from 'src/app/shared/compte.service';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Panier } from 'src/app/model/panier.model';
import { PanierService } from 'src/app/shared/panier.service';
import * as $ from 'jquery';
import { PariPanierService } from 'src/app/shared/pari-panier.service';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeComponent } from 'src/app/qr-code/qr-code.component';

@Component({
  selector: 'app-details-compte',
  templateUrl: './details-compte.component.html',
  styleUrls: ['./details-compte.component.css']
})
export class DetailsCompteComponent implements OnInit {
  idUtilisateur = sessionStorage.getItem('idUserConnecte');
  displayedColumns: string[] = ['qrCode', 'date', 'mise', 'gainPotentiel', 'modifier'];
  dataSource = new MatTableDataSource<Panier>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resourcesLoaded = true;
  // tailleQrCode = 50;

  constructor(
    private panierService: PanierService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Nombre d'élément à afficher"
  }

  ngOnInit(): void {
    this.getPanierByIdCompte();
  }

  afficherQrCode(idPanier){
    const dialogRef = this.dialog.open(QrCodeComponent, {
      data: {
        'idPanier': idPanier
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPanierByIdCompte(){
    this.resourcesLoaded = true;
    this.panierService.getPanierByIdCompte(this.idUtilisateur)
    .subscribe( paniers => {
      this.dataSource.data = paniers as Panier[]; 
      this.resourcesLoaded = false;  
    });
  }

//   qrCodehover(){
//     this.tailleQrCode=150;
//     console.log("hover");
//     // $('#qrCode').on('mouseover', function(event) {
//     //   console.log("hover");
//     // });
//   }

}
