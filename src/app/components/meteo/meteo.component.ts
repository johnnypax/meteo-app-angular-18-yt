import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenStreetMapService } from '../../services/open-street-map.service';
import { LocationData } from '../../models/location-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meteo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './meteo.component.html',
  styleUrl: './meteo.component.css'
})
export class MeteoComponent {

  ricerca?: string;
  elenco: LocationData[] = []

  constructor(private osmService: OpenStreetMapService){

  }

  CercaCitta(): void {
    if(!this.ricerca || this.ricerca?.trim() === ""){
      alert("Stringa vuota, controlla l'input");
      return;
    }

    this.osmService.ListaCitta(this.ricerca).then( ris => {
      this.elenco = ris;
    })
  }

  SelezionaCitta(varLat: string, varLon: string, varNom: string): void{
    console.log(varLat, varLon, varNom);
  }
}
