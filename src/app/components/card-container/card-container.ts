import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-container.html',
  styleUrls: ['./card-container.css']
})
export class CardContainerComponent {
  // Inputs para la imagen y su texto alternativo
  @Input() image: string = '';
  @Input() imageCaption: string = 'Icono de tarjeta';

  // Inputs para el contenido de la tarjeta
  @Input() title: string = '';
  @Input() content: string = '';
}