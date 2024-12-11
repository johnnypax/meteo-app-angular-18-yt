import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenStreetMapService } from '../../services/open-street-map.service';
import { LocationData } from '../../models/location-data';
import { CommonModule } from '@angular/common';
import { OpenMeteoService } from '../../services/open-meteo.service';
import { WeatherData } from '../../models/weather-data';
import { Preferito } from '../../models/preferito';
import { PreferitiService } from '../../services/preferiti.service';

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
  elencoPreferiti: Preferito[] = []
  locationSelezionata?: string;
  locationLatitudine?: string;
  locationLongitudine?: string;
  meteoDati?: WeatherData;

  weatherDescriptions: { [key: number]: string } = {
    0: "Sereno",
    1: "Poco nuvoloso",
    2: "Poco nuvoloso",
    3: "Nuvoloso",
    45: "Nebbia",
    48: "Nebbia da brina",
    51: "Pioviggine leggera",
    53: "Pioviggine moderata",
    55: "Pioviggine intensa",
    61: "Pioggia leggera",
    63: "Pioggia moderata",
    65: "Pioggia intensa",
    66: "Pioggia ghiacciata leggera",
    67: "Pioggia ghiacciata intensa",
    71: "Nevicate leggere",
    73: "Nevicate moderate",
    75: "Nevicate intense",
    80: "Rovesci di pioggia leggeri",
    81: "Rovesci di pioggia moderati",
    82: "Rovesci di pioggia intensi",
    85: "Rovesci di neve leggeri",
    86: "Rovesci di neve intensi",
    95: "Temporali",
    96: "Temporali con grandine (leggeri)",
    99: "Temporali con grandine (intensi)"
  };

  weatherIcons: { [key: number]: string } = {
    0: "fa fa-sun",                  // Sereno
    1: "fa fa-cloud-sun",            // Poco nuvoloso
    2: "fa fa-cloud-sun",            // Poco nuvoloso
    3: "fa fa-cloud",                // Nuvoloso
    45: "fa fa-smog",                // Nebbia
    48: "fa fa-snowflake",           // Nebbia da brina
    51: "fa fa-cloud-rain",          // Pioviggine leggera
    53: "fa fa-cloud-showers-heavy", // Pioviggine moderata
    55: "fa fa-cloud-showers-heavy", // Pioviggine intensa
    61: "fa fa-cloud-rain",          // Pioggia leggera
    63: "fa fa-cloud-showers-heavy", // Pioggia moderata
    65: "fa fa-cloud-showers-heavy", // Pioggia intensa
    66: "fa fa-cloud-rain",          // Pioggia ghiacciata leggera
    67: "fa fa-cloud-meatball",      // Pioggia ghiacciata intensa
    71: "fa fa-snowflake",           // Nevicate leggere
    73: "fa fa-snowflake",           // Nevicate moderate
    75: "fa fa-snowflake",           // Nevicate intense
    80: "fa fa-cloud-showers-heavy", // Rovesci di pioggia leggeri
    81: "fa fa-cloud-showers-heavy", // Rovesci di pioggia moderati
    82: "fa fa-cloud-showers-heavy", // Rovesci di pioggia intensi
    85: "fa fa-snowflake",           // Rovesci di neve leggeri
    86: "fa fa-snowflake",           // Rovesci di neve intensi
    95: "fa fa-bolt",                // Temporali
    96: "fa fa-bolt",                // Temporali con grandine (leggeri)
    99: "fa fa-bolt",                // Temporali con grandine (intensi)
  };

  constructor(
    private osmService: OpenStreetMapService,
    private meteoService: OpenMeteoService,
    private prefService: PreferitiService){
  }

  ngOnInit(){
    this.elencoPreferiti = this.prefService.Lista();
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
    if(!varLat || !varLon){
      alert("Errore nel recupero dei dati");
      return;
    }

    this.meteoService.DatiMeteo(varLat, varLon).then(ris => {
      if(!ris){
        alert("Errore nel recupero dati meteo");
        return;
      }

      this.elenco = [];
      this.locationSelezionata = varNom.split(',')[0].trim();
      this.locationLatitudine = varLat;
      this.locationLongitudine = varLon;
      this.meteoDati = ris;
    })
  }

  ConvertiUnixDataToItaliano(unixtimestamp: number | string) : string {
    const timestamp = typeof unixtimestamp === 'string' ? 
                        parseInt(unixtimestamp, 10) : unixtimestamp;
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('it-IT', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date);
  }

  ConvertiCodiciMeteo(code: number | string){
    const codice = typeof code === 'string' ? 
                        parseInt(code) : code;

    if(this.weatherDescriptions.hasOwnProperty(codice))
      return this.weatherDescriptions[codice];
    
    return "Descrizione non disponibile";
  }

  ConvertiIconeMeteo(code: number | string){
    const codice = typeof code === 'string' ? 
                        parseInt(code) : code;

    if(this.weatherIcons.hasOwnProperty(codice))
      return this.weatherIcons[codice];
    
    return "Descrizione non disponibile";
  }

  AggiungiPreferito(): void{
    if(!this.locationSelezionata || !this.locationLatitudine || !this.locationLongitudine){
      alert("Non posso aggiungere ai preferiti");
      return;
    }

    const pref: Preferito = new Preferito({
      nome: this.locationSelezionata,
      lat: this.locationLatitudine,
      lon: this.locationLongitudine
    })

    if(this.prefService.VerificaEsistenza(pref)){
      alert("Preferito già presente in lista!")
      return;
    }

    if(this.prefService.Aggiungi(pref)){
      alert("Preferito aggiunto con successo!");
      this.elencoPreferiti = this.prefService.Lista();
    }
    else
      alert("Errore nell'aggiunta nei preferiti");

  }

  EliminaPreferito(varNome: string, varLat: string, varLon: string){
    const pref: Preferito = new Preferito({
      nome: varNome,
      lat: varLat,
      lon: varLon
    });

    if(this.prefService.EliminaPreferito(pref)){
      alert("Preferito eliminato con successo")
      this.elencoPreferiti = this.prefService.Lista();
    }
    else{
      alert("Preferito non eliminato")
    }
      
  }
}
