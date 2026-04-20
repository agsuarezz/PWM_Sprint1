import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule], // Esto soluciona los errores de [routerLink]
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Variables de texto
  @Input() copyright: string = '© 2024 Banco Imperium. Todos los derechos reservados.';

  // Enlaces de navegación (RouterLinks)
  @Input() linkPrivacidad: string = '/privacy';
  @Input() linkCookies: string = '/cookies';
  @Input() linkLegal: string = '/legal';

  // Enlaces externos y recursos
  @Input() appstoreLink: string = '#';
  @Input() appstoreImg: string = 'assets/img/appstore-badge.png';
  @Input() playstoreLink: string = '#';
  @Input() playstoreImg: string = 'assets/img/playstore-badge.png';
}