import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-info',
  standalone: true,
  template: `
    <div class="card-info">
      <div class="card-info__text">
        <p class="card-info__title">{{ title }}</p>
        <p class="card-info__subtitle">{{ subtitle }}</p>
      </div>
      <div class="card-info__preview">
        <img [src]="cardImgSrc" [alt]="cardImgAlt">
      </div>
    </div>
  `
})
export class CardInfoComponent {
  @Input() title: string = 'Nombre de Tarjeta';
  @Input() subtitle: string = '**** **** **** 0000';
  @Input() cardImgSrc: string = 'assets/images/card-black-gold.png';
  @Input() cardImgAlt: string = 'Imagen de la tarjeta';
}
