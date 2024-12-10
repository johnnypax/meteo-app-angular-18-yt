import { Injectable } from '@angular/core';
import { LocationData } from '../models/location-data';

@Injectable({
  providedIn: 'root'
})
export class OpenStreetMapService {

  constructor() { }

  async ListaCitta(varNome: string): Promise<LocationData[]> {
    try{

      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${varNome}&format=json`)

      if(!response.ok){
        console.log("Errore Http", response.status);
        return [];
      }

      const risultato : LocationData[] = await response.json();
      return risultato;

    } catch (ex) {
      console.log("Errore:", ex);
    }

    return [];
  }
}
