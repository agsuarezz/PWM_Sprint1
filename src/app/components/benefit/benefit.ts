import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-benefit',
  standalone: true,
  templateUrl: './benefit.html',
  styleUrls: ['./benefit.css']
})
export class BenefitComponent {
  @Input() image: string = '';
  @Input() imageCaption: string = 'Beneficio Imperium';
  @Input() title: string = '';
  @Input() content: string = '';
}