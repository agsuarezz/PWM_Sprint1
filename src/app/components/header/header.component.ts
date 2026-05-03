import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header-container">
      <button class="menu-toggle" id="menu-toggle" (click)="toggleMenu()" aria-label="Abrir menú">☰</button>

      <div class="header-left">
        <a routerLink="/" class="logo-link">
          <img src="/assets/images/logo.jfif" alt="Logo del Banco" class="header-logo">
        </a>
      </div>

      <div class="mobile-overlay" [class.active]="menuOpen" (click)="closeMenu()"></div>

      <div class="header-right" id="main-menu" [class.active]="menuOpen">
        <div class="nav-wrapper">
          <nav class="main-navigation">
            <ul>
              <li><a routerLink="/" (click)="closeMenu()">Inicio</a></li>
              <li><a routerLink="/servicios" (click)="closeMenu()">Servicios</a></li>
              <li><a routerLink="/simulador-prestamos" (click)="closeMenu()">Sim. Préstamos</a></li>
              <li><a routerLink="/cuentas/personal" (click)="closeMenu()">Cuentas</a></li>
            </ul>
          </nav>
          <div class="client-access">
            <a routerLink="/login" class="login-link" (click)="closeMenu()">Acceso Cliente</a>
            <a routerLink="/registro" (click)="closeMenu()">
              <button type="button" class="btn-signup">Hazte Cliente</button>
            </a>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }
}
