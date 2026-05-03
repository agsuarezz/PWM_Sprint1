import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-container',
  standalone: true,
  template: `
    <div class="card-container">
      <div class="card-icon">
        <img [src]="image" [alt]="imageCaption">
      </div>
      <div class="card-body">
        <div class="card-title">{{ title }}</div>
        <div class="card-text">{{ content }}</div>
      </div>
    </div>
  `
})
export class CardContainerComponent {
  @Input() image: string = '';
  @Input() imageCaption: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
}
