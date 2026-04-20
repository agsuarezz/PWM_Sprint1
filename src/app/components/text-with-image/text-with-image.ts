import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-with-image',
  templateUrl: './text-with-image.html',
  styleUrls: ['./text-with-image.css']
})
export class TextWithImageComponent {
  @Input() image_src: string = '';
  @Input() image_alt: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  // Recibimos un Array de textos en lugar de un HTML en bruto
  @Input() benefits: string[] = []; 
}