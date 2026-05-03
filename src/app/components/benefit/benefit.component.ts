import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-benefit',
  standalone: true,
  template: `
    <div class="benefit-card">
      <div class="benefit-image">
        <img [src]="image" [alt]="imageCaption">
      </div>
      <div class="benefit-content">
        <h3>{{ title }}</h3>
        <p>{{ content }}</p>
      </div>
    </div>
  `
})
export class BenefitComponent {
  @Input() image: string = '';
  @Input() imageCaption: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
}
