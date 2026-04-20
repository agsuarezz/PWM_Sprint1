import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.html',
  styleUrls: ['./profile-image.css']
})
export class ProfileImageComponent {
  // Ponemos un avatar por defecto por si el usuario no tiene foto
  @Input() src: string = 'assets/images/default-avatar.png';
  @Input() alt: string = 'Foto de perfil del usuario';
}