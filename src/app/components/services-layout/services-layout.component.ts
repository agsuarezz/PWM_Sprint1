import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services-layout',
  standalone: true,
  template: `
    <main class="services-main">
      <div class="services-container">
        <section class="services-grid">
          <ng-content></ng-content>
        </section>
        <aside class="services-hero-image">
          <img [src]="imageSrc" [alt]="imageAlt">
        </aside>
      </div>
    </main>
  `
})
export class ServicesLayoutComponent {
  @Input() imageSrc: string = 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000';
  @Input() imageAlt: string = 'Imagen de servicios';
}
