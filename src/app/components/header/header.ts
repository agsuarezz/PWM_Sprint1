import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  @Input() logo_link: string = '/index';
  @Input() logo_src: string = 'assets/images/logo.png';
  @Input() logo_alt: string = 'Logo Banco Imperium';

  // ¡Adiós al script.js! Angular controla el estado del menú así de fácil:
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}