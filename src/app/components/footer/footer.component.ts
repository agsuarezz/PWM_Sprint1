import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="footer-socket">
        <div class="socket-container">
          <p>{{ ui?.copyright || 'Banco Imperium © 2026. Todos los derechos reservados.' }}</p>
          <nav class="socket-nav">
            <ul>
              <li><a [href]="ui?.links?.privacidad || '#'">Privacidad</a></li>
              <li><a [href]="ui?.links?.cookies || '#'">Cookies</a></li>
              <li><a [href]="ui?.links?.legal || '#'">Legal</a></li>
            </ul>
          </nav>
          <div class="store-badges">
            <a [href]="ui?.appstore?.link || '#'">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                [alt]="ui?.appstore?.imgAlt || 'Descargar en App Store'" style="height:32px;">
            </a>
            <a [href]="ui?.playstore?.link || '#'">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                [alt]="ui?.playstore?.imgAlt || 'Disponible en Google Play'" style="height:32px;">
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  private contentService = inject(ContentService);
  ui: any = null;

  ngOnInit(): void {
    this.contentService.obtener<any>('footer').subscribe((d: any) => this.ui = d);
  }
}
