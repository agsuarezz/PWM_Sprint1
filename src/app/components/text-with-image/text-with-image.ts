import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importante para el *ngFor

@Component({
  selector: 'app-text-with-image',
  standalone: true,
  imports: [CommonModule], // 2. Añadirlo aquí soluciona el error NG8103
  templateUrl: './text-with-image.html',
  styleUrls: ['./text-with-image.css']
})
export class TextWithImageComponent {
  // Entradas para la imagen
  @Input() image_src: string = '';
  @Input() image_alt: string = 'Imagen de la sección';

  // Entradas para los textos
  @Input() title: string = '';
  @Input() subtitle: string = '';

  // Entrada para la lista de beneficios (es un array de strings)
  @Input() benefits: string[] = [];
}