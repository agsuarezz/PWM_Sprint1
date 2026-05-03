import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="profile-item">
      <div class="profile-info">
        <h3>{{ label }}</h3>
        <p>{{ value || fallback }}</p>
      </div>
      @if (editable) {
        <a href="#" class="btn-primary">Modificar</a>
      }
    </article>
  `
})
export class ProfileItemComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() fallback: string = '';
  @Input() editable: boolean = false;
}
