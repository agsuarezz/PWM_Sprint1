import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movement-item',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
    <div class="movement-item">
      <div class="movement-item__icon">
        <img [src]="iconSrc" [alt]="tipo">
      </div>
      <div class="movement-item__info">
        <p class="movement-item__title">{{ concepto || tipo }}</p>
        <p class="movement-item__date">{{ fecha }}</p>
      </div>
      <div class="movement-item__amount"
        [class.movement-item__amount--neg]="importe < 0"
        [class.movement-item__amount--pos]="importe >= 0">
        {{ importe >= 0 ? '+' : '' }}{{ importe | number:'1.2-2' }} €
      </div>
    </div>
  `
})
export class MovementItemComponent {
  @Input() tipo: string = '';
  @Input() concepto: string = '';
  @Input() fecha: string = '';
  @Input() importe: number = 0;
  @Input() iconSrc: string = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png';
}
