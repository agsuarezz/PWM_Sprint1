import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefit.html',
  styleUrls: ['./benefit.css']
})
export class BenefitComponent {
  // Inputs para la imagen
  @Input() image: string = '';
  @Input() imageCaption: string = 'Icono de beneficio';

  // Inputs para el texto
  @Input() title: string = '';
  @Input() content: string = '';
}