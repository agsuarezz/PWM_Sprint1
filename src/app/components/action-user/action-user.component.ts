import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-user',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="link" class="action-card">
      <div class="action-icon">
        <img [src]="icon" [alt]="label">
      </div>
      <span class="action-text">{{ label }}</span>
    </a>
  `
})
export class ActionUserComponent {
  @Input() link: string = '#';
  @Input() icon: string = '';
  @Input() label: string = '';
}
