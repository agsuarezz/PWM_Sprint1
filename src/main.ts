import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// 1. Importamos con el nombre correcto de la clase y del archivo
import { AppComponent } from './app/app'; 

// 2. Le decimos a Angular que arranque usando el AppComponent
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));