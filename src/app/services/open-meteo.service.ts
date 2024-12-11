import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data';

@Injectable({
  providedIn: 'root'
})
export class OpenMeteoService {

  constructor() { }

  async DatiMeteo(varLat: string, varLon: string): Promise<WeatherData | null>{
    try {
      
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${varLat}&longitude=${varLon}&hourly=temperature_2m,precipitation&timezone=Europe/Rome&timeformat=unixtime&hourly=weathercode`);

      if(!response.ok){
        console.log("Errore HTTP", response.status);
        return null;
      }

      const dati: WeatherData = await response.json();
      return dati;
      
    } catch (ex) {
      console.log("Errore", ex)
    }

    return null;
  }
}
