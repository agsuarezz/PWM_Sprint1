import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Importamos el NavComponent porque el HTML del Header usa <app-nav>
import { NavComponent } from '../nav/nav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NavComponent // Esto soluciona el error de "app-nav is not a known element"
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  // Inputs para personalizar el logo
  @Input() logo_link: string = '/';
  @Input() logo_src: string = 'assets/img/logo.png';
  @Input() logo_alt: string = 'Banco Imperium Logo';

  // Lógica para el menú móvil
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}