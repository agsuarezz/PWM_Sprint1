import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.html',
  styleUrls: ['./header-profile.css']
})
export class HeaderProfileComponent {
  @Input() logo_link: string = '/dashboard';
  @Input() logo_src: string = 'assets/images/logo-imperium.svg';
  @Input() logo_alt: string = 'Logo Imperium';
  
  @Input() username: string = 'Usuario';
  @Input() accountnumber: string = 'ESXX XXXX XXXX XXXX XXXX';
  
  @Input() profilelink: string = '/profile';
  @Input() profilesrc: string = 'assets/icons/user-avatar.svg';
  @Input() profilealt: string = 'Mi Perfil';
}