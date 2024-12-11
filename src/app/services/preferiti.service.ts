import { Injectable } from '@angular/core';
import { Preferito } from '../models/preferito';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferitiService {

  elenco: Preferito[] = [];

  constructor() { 
    const contenutoLs = localStorage.getItem("preferiti_meteo");

    if(!contenutoLs)
      localStorage.setItem("preferiti_meteo", JSON.stringify( [] ));
    else
      this.elenco = JSON.parse(contenutoLs);
  }

  Aggiungi(objPreferito: Preferito): boolean{
    this.elenco.push(objPreferito);
    localStorage.setItem("preferiti_meteo", JSON.stringify(this.elenco));
    return true;
  }

  Lista(): Preferito[]{
    const contenutoLS = localStorage.getItem("preferiti_meteo");
    return contenutoLS ? JSON.parse(contenutoLS) : [];
  }

  VerificaEsistenza(objPreferito: Preferito): boolean{
    const contenutoLS = localStorage.getItem("preferiti_meteo");
    const elenco: Preferito[] = contenutoLS ? JSON.parse(contenutoLS) : [];

    if(elenco.length == 0)
      return false;

    return elenco.some(p => 
      p.nome === objPreferito.nome &&
      p.lat === objPreferito.lat &&
      p.lon === objPreferito.lon)
  }

  EliminaPreferito(objPreferito: Preferito): boolean{
    const contenutoLS = localStorage.getItem("preferiti_meteo");
    const elenco: Preferito[] = contenutoLS ? JSON.parse(contenutoLS) : [];

    if(elenco.length == 0)
      return false;

    const indice = elenco.findIndex(p => 
      p.nome === objPreferito.nome &&
      p.lat === objPreferito.lat &&
      p.lon === objPreferito.lon)

    if(indice != -1){
      elenco.splice(indice, 1);
      localStorage.setItem("preferiti_meteo", JSON.stringify(elenco))
      return true;
    }

    return false;
  }
}
