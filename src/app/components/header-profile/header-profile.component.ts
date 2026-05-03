import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header-profile">
      <div class="header-profile__left">
        <a routerLink="/" class="header-profile__logo-link">
          <img src="/assets/images/logo.jfif" alt="Logo del Banco Imperium" class="header-profile__logo">
        </a>
        <div class="header-profile__user-info">
          <span class="header-profile__username" id="nombre-usuario-header">{{ username }}</span>
          <span class="header-profile__account">{{ accountNumber }}</span>
        </div>
      </div>
      <div class="header-profile__right">
        <a [routerLink]="backLink" class="header-profile__profile-link">
          <img [src]="profileSrc" [alt]="profileAlt" class="header-profile__profile-icon">
        </a>
      </div>
    </header>
  `
})
export class HeaderProfileComponent {
  @Input() username = '';
  @Input() accountNumber = '';
  @Input() backLink = '/movimientos';
  @Input() profileSrc = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/arrow-left.svg';
  @Input() profileAlt = 'Volver';
}
