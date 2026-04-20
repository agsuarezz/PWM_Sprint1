import { Component, ViewEncapsulation } from '@angular/core'; // 1. Importamos ViewEncapsulation
import { RouterOutlet } from '@angular/router';

// Importación de componentes
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  // 2. Añadimos esta línea para que el CSS de app.css afecte a toda la aplicación
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent {
  title = 'banco-imperium';
}