import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form-card',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="register-container">
      <form id="register-form" (ngSubmit)="submitted.emit()">

        <ng-content></ng-content>

        @if (errorMsg) {
          <p style="color:#d9534f; font-size:13px; margin-bottom:10px;">{{ errorMsg }}</p>
        }
        @if (cargando) {
          <p style="color:#888; font-size:13px; margin-bottom:10px;">{{ loadingMsg }}</p>
        }

        <button type="submit" class="btn-primary" [disabled]="cargando">{{ submitLabel }}</button>
      </form>
    </main>
  `
})
export class RegisterFormCardComponent {
  @Input() submitLabel: string = 'Completar Registro';
  @Input() loadingMsg: string = 'Procesando...';
  @Input() errorMsg: string = '';
  @Input() cargando: boolean = false;

  @Output() submitted = new EventEmitter<void>();
}
