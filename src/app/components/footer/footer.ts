import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Textos y enlaces legales
  @Input() copyright: string = '© 2024 Banco Imperium. Todos los derechos reservados.';
  @Input() linkPrivacidad: string = '/privacidad';
  @Input() linkCookies: string = '/cookies';
  @Input() linkLegal: string = '/legal';

  // Enlaces a las tiendas de apps
  @Input() appstoreLink: string = '#';
  @Input() playstoreLink: string = '#';
  @Input() appstoreImg: string = 'assets/images/app-store.svg'; // Ajusta la ruta a la tuya
  @Input() playstoreImg: string = 'assets/images/google-play.svg'; // Ajusta la ruta a la tuya
}