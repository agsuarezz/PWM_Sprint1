import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.html',
  styleUrls: ['./card-info.css']
})
export class CardInfoComponent {
  @Input() title: string = 'Nombre de Tarjeta';
  @Input() subtitle: string = '**** **** **** 0000';
  @Input() card_img_src: string = '';
  @Input() card_img_alt: string = 'Imagen de la tarjeta';
}