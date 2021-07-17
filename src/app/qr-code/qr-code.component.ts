import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PariPanierService } from '../shared/pari-panier.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  level="L"
  text_qrCode = ""
  idPanier = ""
  resourcesLoaded = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pariPanierService: PariPanierService
  ) { }

  ngOnInit(): void {
    this.idPanier = this.data.idPanier
    this.textQRCode()
  }

  textQRCode(){
    this.pariPanierService.qrCode(this.idPanier)
    .subscribe(data => {
      this.text_qrCode = data.message
      this.resourcesLoaded = false;
    })
  }

}
