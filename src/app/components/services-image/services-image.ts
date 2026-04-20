import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services-image',
  templateUrl: './services-image.html',
  styleUrls: ['./services-image.css']
})
export class ServicesImageComponent {
  @Input() image_src: string = '';
  @Input() image_alt: string = 'Imagen descriptiva';
}