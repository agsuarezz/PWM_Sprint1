import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [RouterModule], // 1. Esto soluciona los errores de [routerLink]
  templateUrl: './header-profile.html',
  styleUrls: ['./header-profile.css']
})
export class HeaderProfileComponent {
  // Datos del Logo
  @Input() logo_link: string = '/';
  @Input() logo_src: string = 'assets/img/logo.png';
  @Input() logo_alt: string = 'Banco Imperium';

  // Datos del Usuario
  @Input() username: string = 'Usuario';
  @Input() accountnumber: string = 'ESXX XXXX XXXX XXXX XXXX';
  
  // Datos del icono de perfil
  @Input() profilelink: string = '/profile';
  @Input() profilesrc: string = 'assets/icons/user.svg';
  @Input() profilealt: string = 'Mi Perfil';
}