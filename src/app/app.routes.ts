import { Routes } from '@angular/router';
// Asegúrate de que la ruta de importación sea la correcta para tu proyecto
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
];