import { Routes } from '@angular/router';
import { MeteoComponent } from './components/meteo/meteo.component';

export const routes: Routes = [
    {path: "", redirectTo: "meteo", pathMatch: "full"},
    {path: "meteo", component: MeteoComponent}
];
